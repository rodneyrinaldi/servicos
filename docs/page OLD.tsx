// /task-pilot/app/page.tsx - CLIENT COMPONENT (Com Suporte a Cookies e Correção ICS)
'use client'; 
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image'; 

// =================================================================
// 1. FUNÇÕES UTILITÁRIAS PARA DATAS E FORMATO ICS
// =================================================================
const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const formatICSDate = (dateString: string): string => {
    const dateParts = dateString.split('-'); 
    const yyyy = dateParts[0];
    const mm = dateParts[1];
    const dd = dateParts[2];
    // Mantém o horário fixo como antes
    return `${yyyy}${mm}${dd}T120000Z`;
};

const createICSContent = (results: ProcessoResumo[]): string => {
    if (results.length === 0) return '';
    
    let icsContent = `BEGIN:VCALENDAR\n`;
    icsContent += `VERSION:2.0\n`;
    icsContent += `PRODID:-//TaskPilot//PJE Communications v1.0//BR\n`;
    icsContent += `CALSCALE:GREGORIAN\n`;
    icsContent += `METHOD:PUBLISH\n`;

    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    results.forEach((event) => {
        const uid = `${Date.now()}-${event.numero}@taskpilot.com.br`;
        
        const dtstart = formatICSDate(event.data);
        const dtend = dtstart.replace('T120000Z', 'T130000Z');
        
        // 1. SUMMARY: "Processo Judicial: " + número
        const summary = `Processo Judicial: ${event.numero}`; 
        
        // 2. Escapando caracteres para o corpo da descrição (robusto para ICS)
        const escapedDescription = event.descricao
            .replace(/\\/g, '\\\\') // Escapa backslashes primeiro
            .replace(/,/g, '\\,') // Escapa vírgulas
            .replace(/;/g, '\\;') // Escapa ponto e vírgula
            .replace(/(\r\n|\n|\r)/gm, "\\n") // Escapa quebras de linha
            .trim(); 
            
        // 3. DESCRIPTION: Combina o texto dinâmico (comunicação PJe) com o texto estático do modelo
        const description = `Descrição: ${escapedDescription}\\n\\nAPI PJe - Acompanhamento de processo judicial via sistema eletrônico.`;

        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `UID:${uid}\n`;
        icsContent += `DTSTAMP:${now}\n`; 
        icsContent += `DTSTART:${dtstart}\n`; 
        icsContent += `DTEND:${dtend}\n`; 
        icsContent += `SUMMARY:${summary}\n`; 
        icsContent += `DESCRIPTION:${description}\n`;
        // 4. LOCATION (Estático do modelo)
        icsContent += `LOCATION:Tribunal de Justiça de São Paulo - Online\n`;
        // 5. STATUS (NEEDS-ACTION para nova tarefa, como no modelo)
        icsContent += `STATUS:NEEDS-ACTION\n`;
        // 6. PRIORITY (Estático do modelo)
        icsContent += `PRIORITY:1\n`; 
        // 7. CLASS (Estático do modelo)
        icsContent += `CLASS:PUBLIC\n`;
        // 8. ORGANIZER (Estático do modelo)
        icsContent += `ORGANIZER;CN=TaskPilot:mailto:contato@taskpilot.com.br\n`;
        icsContent += `END:VEVENT\n`;
    });

    icsContent += `END:VCALENDAR\n`;
    
    return icsContent;
};


// =================================================================
// 2. DADOS DOS ESTADOS E TIPAGEM (Mantidos)
// =================================================================
const ESTADOS_BRASIL = [
    { uf: 'AC', nome: 'Acre' }, { uf: 'SP', nome: 'São Paulo' },
    { uf: 'TO', nome: 'Tocantins' },
];

type ProcessoResumo = { data: string; descricao: string; numero: string; };
type SearchState = 'IDLE' | 'LOADING' | 'RESULTS' | 'ERROR';

type ComunicacaoItem = {
    data_disponibilizacao: string;
    tipoComunicacao: string;
    nomeOrgao: string;
    texto: string;
    numero_processo: string;
    numeroprocessocommascara: string;
};

// =================================================================
// 3. COMPONENTES AUXILIARES (TaskPilotLogo) (Mantidos)
// =================================================================
const TaskPilotLogo = () => (
  <div className="flex items-center justify-center">
    <Image 
      src="/logo.svg" 
      alt="Task Pilot Logo - Símbolo da Justiça e Prazos" 
      width={180} 
      height={48} 
      className="w-40 h-auto sm:w-64 sm:h-auto"
      unoptimized 
      priority 
    />
  </div>
);


// =================================================================
// 4. COMPONENTE DE BUSCA (TaskSearchSection)
// =================================================================

const API_BASE_URL = "https://comunicaapi.pje.jus.br/api/v1/comunicacao";

const TaskSearchSection = () => {
  // ==========================
  // LÓGICA DE COOKIES
  // ==========================
  
  // Função para ler um cookie
  const getCookie = (name: string): string | undefined => {
    if (typeof document === 'undefined') return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };

  // Função para definir um cookie
  const setCookie = (name: string, value: string, days: number = 365) => {
    if (typeof document === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}${expires}; path=/`;
  };
  
  // ==========================
  // ESTADOS DO COMPONENTE
  // ==========================
  const [oabNumero, setOabNumero] = useState('');
  const [oabUf, setOabUf] = useState(''); 
  const [dataInicial, setDataInicial] = useState(getTodayDate());
  const [dataFinal, setDataFinal] = useState(getTodayDate());
  
  const [state, setState] = useState<SearchState>('IDLE');
  const [results, setResults] = useState<ProcessoResumo[]>([]);
  const [hasSearched, setHasSearched] = useState(false); 

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const filterGroupRef = useRef<HTMLDivElement>(null); 
  
  // ==========================
  // EFEITOS DE COOKIE
  // ==========================
  
  // 1. Efeito para LER cookies na montagem e preencher o estado
  useEffect(() => {
    const savedOabNumero = getCookie('oabNumero');
    const savedOabUf = getCookie('oabUf');

    if (savedOabNumero) {
      setOabNumero(savedOabNumero);
    }
    if (savedOabUf) {
      setOabUf(savedOabUf);
    }
  }, []); // Executa apenas uma vez na montagem
  
  // 2. Efeito para SALVAR oabNumero quando ele muda
  useEffect(() => {
    if (oabNumero) {
      setCookie('oabNumero', oabNumero);
    }
  }, [oabNumero]);

  // 3. Efeito para SALVAR oabUf quando ele muda
  useEffect(() => {
    if (oabUf) {
      setCookie('oabUf', oabUf);
    }
  }, [oabUf]);


  // ==========================
  // FUNÇÕES AUXILIARES E HANDLERS
  // ==========================
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterGroupRef.current && !filterGroupRef.current.contains(event.target as Node)) {
        setIsFiltersOpen(false);
      }
    };

    if (isFiltersOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFiltersOpen]);
  
  
  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(false); 
    
    if (oabNumero.length < 1 || oabUf === '' || !dataInicial || !dataFinal) {
      setErrorMsg('Preencha todos os campos obrigatórios (OAB, UF e Datas).');
      if (!dataInicial || !dataFinal) setIsFiltersOpen(true);
      return;
    }
    
    setState('LOADING');
    setErrorMsg(null);
    setIsFiltersOpen(false);

    const url = `${API_BASE_URL}?` + new URLSearchParams({
        numeroOab: oabNumero,
        ufOab: oabUf,
        dataDisponibilizacaoInicio: dataInicial,
        dataDisponibilizacaoFim: dataFinal,
        pagina: '1',
        itensPorPagina: '100'
    }).toString();
    
    try {
        const response = await fetch(url); 
        
        if (!response.ok) {
            let message = `Erro ao buscar comunicações (Status: ${response.status}).`;
            if (response.status === 422) {
                const errorData = await response.json();
                message = errorData.message || 'Erro negocial (422). Verifique os dados de entrada.';
            } else if (response.status === 429) {
                message = 'Taxa de requisições excedida (429). Tente novamente mais tarde.';
            }
            throw new Error(message);
        }
        
        const data = await response.json();
        const apiItems: ComunicacaoItem[] = data.items || [];

        const mappedResults: ProcessoResumo[] = apiItems.map(item => ({
            data: item.data_disponibilizacao, 
            // Garante que a descrição combine o tipo e o texto, ou o nome do órgão
            descricao: `${item.tipoComunicacao || ''} - ${item.texto || item.nomeOrgao || 'Sem detalhes de comunicação'}`,
            numero: item.numeroprocessocommascara || item.numero_processo || 'N/A', 
        }));
        
        setResults(mappedResults); 
        setState('RESULTS');
        setHasSearched(true); 
        setErrorMsg(null);

    } catch (error) {
        console.error("Erro na busca da API:", error);
        setErrorMsg(error instanceof Error ? error.message : 'Falha na comunicação com a API.');
        setState('ERROR');
    }
  }, [oabNumero, oabUf, dataInicial, dataFinal]);

  
  const handleDownload = useCallback(() => {
    if (results.length === 0) {
        alert('Nenhum resultado para baixar. Realize uma pesquisa primeiro.');
        return;
    }
    
    const icsContent = createICSContent(results);
    const filename = `PJE_Comunicações_${dataInicial.replace(/-/g, '')}_${dataFinal.replace(/-/g, '')}.ics`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  }, [dataInicial, dataFinal, results]);


  const renderResultContent = () => {
    
    const content = (() => {
        switch (state) {
            case 'LOADING': return <p className="text-center text-gray-600">Buscando comunicações...</p>;
            case 'ERROR': return <p className="text-center text-red-600 font-medium">{errorMsg}</p>;
            case 'RESULTS':
                if (results.length === 0) {
                    return <div className="text-center text-gray-600"><p>Nenhuma movimentação encontrada no período.</p></div>;
                }
                return (
                    <ul className="space-y-3">
                        {results.map((p, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-800 p-2 bg-gray-50 rounded">
                                <span className="text-cyan-500 mr-3 mt-1">🔔</span>
                                <div>
                                    <p><span className="font-medium text-cyan-500">{p.data}</span> - <span className="font-semibold">{p.numero}</span></p>
                                    <p className="text-xs text-gray-700 mt-1">{p.descricao}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                );
            default:
                return (<p className="text-center text-gray-600">Insira a OAB e um intervalo de datas para buscar processos.</p>);
        }
    })();

    // Seção de Resultados com Altura Fixa
    return (
        <div className="mt-6 pt-4 border-t border-gray-200">
            <p className={`text-sm text-gray-500 mb-2 ${state === 'IDLE' ? 'opacity-0' : 'opacity-100'}`}>
                {state === 'RESULTS' && `Resultados encontrados: ${results.length}`}
            </p>

            {/* Contêiner fixo com altura e scroll vertical */}
            <div 
                className="max-h-64 overflow-y-auto pr-2"
                style={{ minHeight: '4rem' }} 
            >
                {content}
            </div>
        </div>
    );
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4"> 
      
      {/* 1. GRUPO DE FILTROS (Inputs de OAB e Data) */}
      <div ref={filterGroupRef} className="relative space-y-2 z-10">
          
          {/* DIV OAB/UF */}
          <div 
            className="flex space-x-2 items-center cursor-pointer bg-white rounded-lg px-3 py-2" 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
              <div className="flex-2 w-2/3 relative">
                  <input
                      id="oabNumero"
                      type="text"
                      value={oabNumero}
                      onChange={(e) => setOabNumero(e.target.value)}
                      placeholder="Nº da OAB"
                      aria-label="Número da OAB" 
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-gray-800"
                      disabled={state === 'LOADING'}
                  />
              </div>
              <div className="flex-1 w-1/3 relative">
                  <select
                      id="oabUf"
                      value={oabUf}
                      onChange={(e) => setOabUf(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-gray-800 appearance-none"
                      disabled={state === 'LOADING'}
                      aria-label="Selecione o estado da OAB" 
                  >
                      <option value="">UF</option>
                      {ESTADOS_BRASIL.map((estado) => (
                          <option key={estado.uf} value={estado.uf}>
                              {estado.uf}
                          </option>
                      ))}
                  </select>
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      {isFiltersOpen ? '▲' : '▼'}
                  </span>
              </div>
          </div>
          
          {/* DIV Datas */}
          <div 
            className={`absolute z-20 inset-x-0 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg ${isFiltersOpen ? 'max-h-40 opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}`}
            style={{ top: 'calc(100% + 8px)' }} 
          >
              <div className="flex space-x-2 px-3"> 
                      <div className="flex-1">
                          <input
                              id="dataInicial"
                              type="date"
                              value={dataInicial}
                              onChange={(e) => setDataInicial(e.target.value)}
                              aria-label="Data Inicial" 
                              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-gray-800"
                              disabled={state === 'LOADING'}
                          />
                      </div>
                      <div className="flex-1">
                          <input
                              id="dataFinal"
                              type="date"
                              value={dataFinal}
                              onChange={(e) => setDataFinal(e.target.value)}
                              aria-label="Data Final" 
                              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-gray-800"
                              disabled={state === 'LOADING'}
                          />
                      </div>
                  </div>
          </div>
      </div>
      
      {/* 2. SEÇÃO DE RESULTADOS (COM ALTURA FIXA E SEM TÍTULO) */}
      {renderResultContent()}
      
      {/* 3. BOTÕES EMPILHADOS (POR ÚLTIMO) */}
      <div className="space-y-3 pt-3">
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-60"
            disabled={state === 'LOADING'}
          >
            {state === 'LOADING' ? 'Buscando...' : '🔍 Pesquisar Movimentações'}
          </button>

          <button
            onClick={handleDownload}
            type="button" 
            className={`w-full flex items-center justify-center font-bold py-3 rounded-lg transition duration-200 ${
                hasSearched && state !== 'LOADING' && results.length > 0
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!hasSearched || state === 'LOADING' || results.length === 0}
          >
            🗓️ Baixar Agendamentos (.ICS)
          </button>
      </div>
      
    </form>
  );
};


// =================================================================
// 5. COMPONENTE PRINCIPAL (Mantido)
// =================================================================

export default function Home() {
    return (
        <main className="min-h-screen bg-[#1A202C] flex flex-col items-center pt-8 pb-12 p-4">
            <div className="w-full max-w-lg">
                
                <div className="text-center mb-8">
                    <TaskPilotLogo />
                </div>
                
                <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
                  <TaskSearchSection />
                </div>
                
            </div>
        </main>
    );
}