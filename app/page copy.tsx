'use client'; 
import React, { useState, useCallback, useEffect } from 'react';
// IMPORTANTE: Adicionado o componente Image do Next.js
import Image from 'next/image';
import { AlertTriangle, Download, Search, CheckCircle, Zap, Users, Star, MessageSquare } from 'lucide-react';

// =================================================================
// 1. TIPAGEM E DADOS CONSTANTES (Data Layer)
// =================================================================

// Cores primárias no estilo Google (Ciano/Azul)
const GOOGLE_BLUE = 'text-blue-600'; // Azul primário
const GOOGLE_SHADOW = 'shadow-md hover:shadow-lg'; // Sombras sutis e elevadas

// Tipos de dados (Mantidos)
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

// Dados (Mantidos/Refinados)
const API_BASE_URL = "https://comunicaapi.pje.jus.br/api/v1/comunicacao";
const ESTADOS_BRASIL = [
    { uf: 'AC', nome: 'Acre' }, { uf: 'AM', nome: 'Amazonas' }, 
    { uf: 'SP', nome: 'São Paulo' }, { uf: 'RJ', nome: 'Rio de Janeiro' },
    { uf: 'TO', nome: 'Tocantins' },
    { uf: 'MG', nome: 'Minas Gerais' }, { uf: 'PR', nome: 'Paraná' },
    { uf: 'RS', nome: 'Rio Grande do Sul' }, { uf: 'BA', nome: 'Bahia' },
    { uf: 'DF', nome: 'Distrito Federal' }, { uf: 'PE', nome: 'Pernambuco' }
];

const CLIENTES = [
    { nome: "Advocacia Souza", logo: "https://placehold.co/120x60/4285F4/ffffff?text=Souza+Adv" }, // Usando Google Blue
    { nome: "Jurídico Lima", logo: "https://placehold.co/120x60/34A853/ffffff?text=Lima+Jur" }, // Usando Google Green
    { nome: "Câmara & Costa", logo: "https://placehold.co/120x60/FBBC05/ffffff?text=Camara+%26+Co" }, // Usando Google Yellow
    { nome: "Escritório Silva", logo: "https://placehold.co/120x60/EA4335/ffffff?text=Silva+ES" }, // Usando Google Red
];

const DEPOIMENTOS = [
    {
        nome: "Dr. Ana Costa",
        cargo: "Advogada Autônoma",
        texto: "O Task Pilot transformou a maneira como gerencio prazos. Em segundos, tenho todos os agendamentos no meu calendário. Essencial para a advocacia moderna!",
    },
    {
        nome: "Felipe Almeida",
        cargo: "Gestor de Equipe Jurídica",
        texto: "A integração com o PJe é impecável. Nossa equipe economiza horas valiosas que antes eram gastas em cadastros manuais.",
    },
];

const BENEFICIOS = [
    { 
        icone: <CheckCircle className={`w-6 h-6 ${GOOGLE_BLUE}`} />,
        titulo: "Agendamento Automático",
        descricao: "Transforme comunicações judiciais em eventos no calendário com um clique, sem erros manuais.",
    },
    { 
        icone: <Zap className="w-6 h-6 text-orange-500" />,
        titulo: "Redução de Riscos",
        descricao: "Minimize a chance de perder prazos cruciais ao automatizar a captura de dados diretamente do PJe.",
    },
    { 
        icone: <Users className="w-6 h-6 text-green-500" />,
        titulo: "Foco no Cliente",
        descricao: "Libere o tempo da sua equipe para se concentrar em estratégia e atendimento, e não em tarefas repetitivas.",
    },
];

// =================================================================
// 2. FUNÇÕES UTILITÁRIAS (Mantidas)
// =================================================================

const getTodayDate = (): string => new Date().toISOString().split('T')[0];

const formatICSDate = (dateString: string): string => {
    const [yyyy, mm, dd] = dateString.split('-');
    return `${yyyy}${mm}${dd}T120000Z`;
};

const CookieService = {
    get: (name: string): string | undefined => {
        if (typeof document === 'undefined') return undefined;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return undefined;
    },
    set: (name: string, value: string, days: number = 365) => {
        if (typeof document === 'undefined') return;
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `; expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}${expires}; path=/`;
    }
};

const createICSContent = (results: ProcessoResumo[]): string => {
    if (results.length === 0) return '';
    
    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const header = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TaskPilot//PJE Communications v1.0//BR\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n`;
    let events = '';

    results.forEach((event) => {
        const uid = `${Date.now()}-${event.numero}@taskpilot.com.br`;
        const dtstart = formatICSDate(event.data);
        const dtend = dtstart.replace('T120000Z', 'T130000Z'); 
        
        const summary = `Processo Judicial: ${event.numero}`; 
        
        // Escapando caracteres
        const escapedDescription = event.descricao
            .replace(/\\/g, '\\\\')
            .replace(/,/g, '\\,')
            .replace(/;/g, '\\;')
            .replace(/(\r\n|\n|\r)/gm, "\\n")
            .trim(); 
            
        const description = `Descrição: ${escapedDescription}\\n\\nAPI PJe - Acompanhamento de processo judicial via sistema eletrônico.`;

        events += `BEGIN:VEVENT\nUID:${uid}\nDTSTAMP:${now}\nDTSTART:${dtstart}\nDTEND:${dtend}\n`; 
        events += `SUMMARY:${summary}\nDESCRIPTION:${description}\n`;
        events += `LOCATION:Tribunal de Justiça - Eletrônico\nSTATUS:NEEDS-ACTION\nPRIORITY:1\nCLASS:PUBLIC\n`;
        events += `ORGANIZER;CN=TaskPilot:mailto:contato@taskpilot.com.br\nEND:VEVENT\n`;
    });

    return header + events + 'END:VCALENDAR\n';
};

// =================================================================
// 3. COMPONENTES MODULARES DA UI (Refatorados para Google Style + Next/Image)
// =================================================================

// 3.1. Logo do Aplicativo (Minimalista e colorido)
const TaskPilotLogo = ({ className = 'w-40 h-10' }: { className?: string }) => (
    <div className={`flex items-center justify-center ${className}`}>
        <span className={`text-4xl font-black text-gray-800`}>
            Task
        </span>
        <span className={`text-4xl font-black ${GOOGLE_BLUE}`}>
            Pilot
        </span>
    </div>
);

// 3.2. Seção de Resultados (Estilo Cards com separadores sutis)
interface ResultDisplayProps {
    state: SearchState;
    results: ProcessoResumo[];
    errorMsg: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ state, results, errorMsg }) => {
    
    let content: React.ReactNode;
    let infoText = '';

    switch (state) {
        case 'LOADING':
            content = (
                <div className="flex flex-col justify-center items-center h-full p-8">
                    <div className="flex space-x-2 animate-pulse">
                        <div className={`w-3 h-3 rounded-full bg-blue-500`}></div>
                        <div className={`w-3 h-3 rounded-full bg-red-500`}></div>
                        <div className={`w-3 h-3 rounded-full bg-yellow-500`}></div>
                        <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
                    </div>
                    <p className="mt-4 text-gray-600">Buscando comunicações...</p>
                </div>
            );
            infoText = 'Buscando comunicações...';
            break;
        case 'ERROR':
            content = <p className="text-center text-red-600 font-medium p-4 flex items-center justify-center"><AlertTriangle className="w-5 h-5 mr-2" /> {errorMsg}</p>;
            infoText = 'Erro na busca.';
            break;
        case 'RESULTS':
            if (results.length === 0) {
                content = <div className="text-center text-gray-500 p-8"><p>Nenhuma movimentação encontrada no período.</p></div>;
                infoText = 'Busca concluída. Nenhum resultado.';
            } else {
                content = (
                    <ul className="space-y-4 p-4">
                        {results.map((p, index) => (
                            <li key={index} className="flex items-start text-base text-gray-800 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition duration-150">
                                <CheckCircle className={`w-5 h-5 text-green-500 shrink-0 mt-1 mr-4`} />
                                <div>
                                    <p className="text-sm font-semibold text-gray-500">{p.data}</p>
                                    <p className={`font-bold text-gray-800 mt-1`}>{p.numero}</p>
                                    <p className="text-sm text-gray-600 mt-1">{p.descricao}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                );
                infoText = `${results.length} Movimentações encontradas.`;
            }
            break;
        default:
            content = <div className="text-center text-gray-500 p-8"><p>Insira a OAB e um intervalo de datas para iniciar a busca.</p></div>;
            infoText = 'Pronto para buscar.';
    }

    return (
        <div className={`bg-white rounded-xl ${GOOGLE_SHADOW} border border-gray-100 mt-8`}>
            <div className="p-4 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">{infoText}</p>
            </div>
            
            <div 
                className="max-h-80 overflow-y-auto"
                style={{ minHeight: '12rem' }} 
            >
                {content}
            </div>
        </div>
    );
};

// 3.3. Formulário de Busca (Mantido)
const TaskSearchForm: React.FC = () => {
    // ESTADOS
    const [oabNumero, setOabNumero] = useState('');
    const [oabUf, setOabUf] = useState(''); 
    const [dataInicial, setDataInicial] = useState(getTodayDate());
    const [dataFinal, setDataFinal] = useState(getTodayDate());
    const [state, setState] = useState<SearchState>('IDLE');
    const [results, setResults] = useState<ProcessoResumo[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    
    // EFEITOS DE COOKIE
    useEffect(() => {
        const savedOabNumero = CookieService.get('oabNumero');
        const savedOabUf = CookieService.get('oabUf');

        if (savedOabNumero) setOabNumero(savedOabNumero);
        if (savedOabUf) setOabUf(savedOabUf);
    }, []); 

    useEffect(() => {
        if (oabNumero) CookieService.set('oabNumero', oabNumero);
    }, [oabNumero]);

    useEffect(() => {
        if (oabUf) CookieService.set('oabUf', oabUf);
    }, [oabUf]);
    
    // HANDLERS
    const handleSearch = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (oabNumero.length < 1 || oabUf === '' || !dataInicial || !dataFinal) {
            setErrorMsg('Preencha todos os campos obrigatórios (OAB, UF e Datas).');
            return;
        }
        
        setState('LOADING');
        setErrorMsg(null);

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
                descricao: `${item.tipoComunicacao || ''} - ${item.texto || item.nomeOrgao || 'Sem detalhes de comunicação'}`,
                numero: item.numeroprocessocommascara || item.numero_processo || 'N/A', 
            }));
            
            setResults(mappedResults); 
            setState('RESULTS');
            setErrorMsg(null);

        } catch (error) {
            console.error("Erro na busca da API:", error);
            setErrorMsg(error instanceof Error ? error.message : 'Falha na comunicação com a API.');
            setState('ERROR');
        }
    }, [oabNumero, oabUf, dataInicial, dataFinal]);

    
    const handleDownload = useCallback(() => {
        if (results.length === 0) {
            setErrorMsg('Nenhum resultado para baixar. Realize uma pesquisa primeiro.');
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
    
    const isDownloadEnabled = state === 'RESULTS' && results.length > 0;

    return (
        <form onSubmit={handleSearch} className="space-y-4"> 
            
            {/* INPUTS PRINCIPAIS - Agrupados em uma "Search Bar" de estilo Google */}
            <div className={`flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 p-3 bg-white border border-gray-200 rounded-3xl ${GOOGLE_SHADOW} focus-within:ring-2 focus-within:ring-blue-300 transition duration-300`}>
                
                {/* OAB + UF */}
                <div className="flex w-full sm:w-1/2 space-x-3">
                    <input
                        id="oabNumero"
                        type="number"
                        value={oabNumero}
                        onChange={(e) => setOabNumero(e.target.value)}
                        placeholder="Nº da OAB"
                        required
                        className="flex-1 p-2 text-gray-800 border-none focus:ring-0 focus:outline-none placeholder-gray-500"
                        disabled={state === 'LOADING'}
                    />
                    <select
                        id="oabUf"
                        value={oabUf}
                        onChange={(e) => setOabUf(e.target.value)}
                        required
                        aria-label="Estado da OAB"
                        className="w-20 p-2 text-gray-800 border-none focus:ring-0 focus:outline-none appearance-none bg-white"
                        disabled={state === 'LOADING'}
                    >
                        <option value="" disabled>UF</option>
                        {ESTADOS_BRASIL.map((estado) => (
                            <option key={estado.uf} value={estado.uf}>
                                {estado.uf}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Datas */}
                <div className="flex w-full sm:w-1/2 space-x-3 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-3">
                    <input
                        id="dataInicial"
                        type="date"
                        value={dataInicial}
                        onChange={(e) => setDataInicial(e.target.value)}
                        required
                        aria-label="Data Inicial" 
                        className="flex-1 p-2 text-gray-800 border-none focus:ring-0 focus:outline-none"
                        disabled={state === 'LOADING'}
                    />
                    <input
                        id="dataFinal"
                        type="date"
                        value={dataFinal}
                        onChange={(e) => setDataFinal(e.target.value)}
                        required
                        aria-label="Data Final" 
                        className="flex-1 p-2 text-gray-800 border-none focus:ring-0 focus:outline-none"
                        disabled={state === 'LOADING'}
                    />
                </div>
            </div>

            {/* BOTÕES DE AÇÃO - Estilo Google Material (elevado e colorido) */}
            <div className="flex justify-center space-x-4 pt-2">
                
                {/* Botão de Pesquisa (Primário - Azul) */}
                <button
                    type="submit"
                    className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full ${GOOGLE_SHADOW} shadow-blue-500/30 transition duration-300 disabled:opacity-50 disabled:shadow-none`}
                    disabled={state === 'LOADING'}
                >
                    <Search className="w-5 h-5 mr-2" />
                    {state === 'LOADING' ? 'Buscando...' : 'Pesquisar'}
                </button>

                {/* Botão de Download (Secundário/Sucesso - Verde) */}
                <button
                    onClick={handleDownload}
                    type="button" 
                    className={`flex items-center justify-center font-medium px-6 py-3 rounded-full transition duration-300 border ${
                        isDownloadEnabled
                            ? 'bg-white text-green-600 hover:bg-green-50 border-green-600'
                            : 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300'
                    } ${isDownloadEnabled ? GOOGLE_SHADOW : ''}`}
                    disabled={!isDownloadEnabled}
                >
                    <Download className="w-5 h-5 mr-2" />
                    ICS
                </button>
            </div>
            
            {/* VISUALIZAÇÃO DOS RESULTADOS */}
            <ResultDisplay state={state} results={results} errorMsg={errorMsg} />
            
        </form>
    );
};


// 3.4. Seção Principal (Hero/CTA)
const HeroSection: React.FC = () => (
    <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
            
            <TaskPilotLogo className="mx-auto mb-8 w-60 h-16" />
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Agendamento de Prazos <span className={GOOGLE_BLUE}>Inteligente</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Sincronize automaticamente as comunicações judiciais do PJe diretamente com seu calendário.
            </p>

            <div className="mt-12">
                <TaskSearchForm />
            </div>

        </div>
    </section>
);

// 3.5. Seção de Benefícios (Mantida)
const BenefitsSection: React.FC = () => (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Vantagens do Task Pilot
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BENEFICIOS.map((b, index) => (
                    <div key={index} className={`flex flex-col items-center text-center p-8 bg-white rounded-xl ${GOOGLE_SHADOW} border border-gray-100 transition duration-300`}>
                        <div className={`mb-4 p-3 rounded-full bg-blue-50/50`}>{b.icone}</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{b.titulo}</h3>
                        <p className="text-gray-600">{b.descricao}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// 3.6. Seção de Clientes (Refatorada para usar Next/Image)
const ClientsSection: React.FC = () => (
    <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold text-gray-500 mb-8">
                Confiança de escritórios em todo o Brasil
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                {CLIENTES.map((c, index) => (
                    <div key={index} className="p-2 bg-white rounded-lg opacity-80 hover:opacity-100 transition duration-300 relative w-32 h-10">
                        {/* ⚠️ USO DO COMPONENTE <Image /> */}
                        <Image
                            src={c.logo}
                            alt={`Logo do Cliente ${c.nome}`}
                            width={120} // Tamanho intrínseco original
                            height={60} // Tamanho intrínseco original
                            // O estilo 'h-10 object-contain' da <img> original é mapeado
                            // usando 'object-contain' e 'layout=responsive' ou 'fill'
                            // Como estamos usando width/height intrínseco, 'object-contain' na classe
                            // e o height/width do div pai (w-32 h-10) controlam o tamanho visual.
                            className="h-10 object-contain" // Tailwind CSS para estilo visual no elemento Image
                            priority={true} // Pode ser bom para logos no início da página
                            // Necessário adicionar o domínio placehold.co no next.config.js para imagens externas
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// 3.7. Seção de Depoimentos (Mantida)
const TestimonialsSection: React.FC = () => (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                O que dizem nossos usuários
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {DEPOIMENTOS.map((d, index) => (
                    <div key={index} className={`p-8 bg-white rounded-xl ${GOOGLE_SHADOW} border border-gray-100`}>
                        <Star className={`w-5 h-5 text-yellow-500 fill-yellow-500 mb-4`} />
                        <p className="text-gray-700 italic mb-4">{d.texto}</p>
                        <div className="font-semibold text-gray-800">
                            {d.nome}
                            <p className="text-sm font-normal text-gray-600">{d.cargo}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// 3.8. Seção de Monetização e Sugestões (Mantida)
const MonetizationAndSurveySection: React.FC = () => (
    <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. Área de Propaganda (Monetização) */}
            <div className={`bg-gray-50 p-8 rounded-xl ${GOOGLE_SHADOW} border border-gray-200 text-center`}>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Impulsione seu Negócio
                </h3>
                <p className="text-gray-600 mb-6">
                    Espaço reservado para parcerias e ferramentas jurídicas essenciais.
                </p>
                {/* Aqui, se fosse um banner real, também deveria ser <Image /> */}
                <div className="h-32 bg-yellow-50 border-2 border-yellow-300 border-dashed flex items-center justify-center text-yellow-700 font-medium rounded-lg">
                    [Banner de Parceiro]
                </div>
            </div>

            {/* 2. Área de Enquetes e Sugestões */}
            <div className={`bg-gray-50 p-8 rounded-xl ${GOOGLE_SHADOW} border border-gray-200`}>
                <h3 className={`text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center md:justify-start ${GOOGLE_BLUE}`}>
                    <MessageSquare className={`w-6 h-6 mr-2 ${GOOGLE_BLUE}`} />
                    Opinião e Sugestões
                </h3>
                <p className="text-gray-600 mb-4">
                    Ajude-nos a evoluir. O que você gostaria de ver no Task Pilot?
                </p>
                <form className="space-y-3">
                    <textarea
                        rows={3}
                        placeholder="Deixe sua sugestão aqui..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200 shadow-lg shadow-blue-500/30"
                    >
                        Enviar Feedback
                    </button>
                </form>
            </div>
        </div>
    </section>
);

// 3.9. Footer (Mantido)
const Footer: React.FC = () => (
    <footer className="bg-gray-100 text-gray-700 py-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            <TaskPilotLogo className="mx-auto w-32 h-8" />
            <p className="mt-4 text-gray-500">
                &copy; {new Date().getFullYear()} Task Pilot. Todos os direitos reservados.
            </p>
            <div className="mt-3 space-x-4">
                <a href="#" className={`hover:${GOOGLE_BLUE} transition`}>Termos de Uso</a>
                <span className="text-gray-400">|</span>
                <a href="#" className={`hover:${GOOGLE_BLUE} transition`}>Política de Privacidade</a>
            </div>
            <p className="mt-3 text-xs text-gray-500">
                *O Task Pilot é uma ferramenta de terceiros e não possui vínculo oficial com o PJe.
            </p>
        </div>
    </footer>
);


// =================================================================
// 4. COMPONENTE PRINCIPAL (Reúne as Seções)
// =================================================================

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <HeroSection /> 
            <ClientsSection />
            <BenefitsSection />
            <TestimonialsSection />
            <MonetizationAndSurveySection />
            <Footer />
        </div>
    );
}