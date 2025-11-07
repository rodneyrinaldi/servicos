// features/search-widget/components/TaskSearchForm.tsx
'use client'; 
import React, { useCallback } from 'react';
import { Download, Search } from 'lucide-react';

// 1. Importa o Hook que contém toda a lógica e estados
import { useTaskSearch } from '../hooks/useTaskSearch';

// 2. Importa utilidades globais (para o download ICS)
import { createICSContent } from '../../../lib/ics';
// import { getTodayDate } from '../../../lib/utils'; // Apenas se não estiver no hook

// 3. Importa dados estáticos
import { ESTADOS_BRASIL } from '../../landing-page/data'; 

// 4. Importa o componente de visualização de resultados
import ResultDisplay from './ResultDisplay';

// OBS: Removemos os tipos de ProcessoResumo e SearchState, pois eles são manipulados via Hook.

interface TaskSearchFormProps {
    primaryColor?: string; 
    isEmbedded?: boolean; 
}

const TaskSearchForm: React.FC<TaskSearchFormProps> = ({ primaryColor = 'blue-600', isEmbedded = false }) => {
    
    // CONSOME A LÓGICA DO HOOK
    const {
        oabNumero, setOabNumero,
        oabUf, setOabUf,
        dataInicial, setDataInicial,
        dataFinal, setDataFinal,
        state,
        results,
        errorMsg,
        handleSearch,
        isDownloadEnabled
    } = useTaskSearch();

    // LÓGICA DE DOWNLOAD (Mantida aqui por ser uma ação de UI)
    const handleDownload = useCallback(() => {
        if (!results || results.length === 0) return;

        // const icsContent = createICSContent(results, getTodayDate());
        const icsContent = createICSContent(results);

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `prazos_taskpilot_${dataInicial}_a_${dataFinal}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }, [dataInicial, dataFinal, results]);
    
    
    // --- CLASSES DE ESTILO ---
    const primaryStyle = primaryColor.startsWith('#') ? `style={{ backgroundColor: '${primaryColor}' }}` : `bg-${primaryColor} hover:bg-blue-700`;
    const buttonClass = `flex items-center justify-center ${primaryStyle} text-white font-medium px-6 py-3 rounded-full shadow-lg shadow-blue-500/30 transition duration-300 disabled:opacity-50 disabled:shadow-none`;
    
    const containerClasses = isEmbedded 
        ? "space-y-4 p-4 border rounded-xl shadow-md bg-white" 
        : "space-y-4";

    return (
        <form onSubmit={handleSearch} className={containerClasses}> 
            
            <div className={`flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 p-3 bg-white border border-gray-200 rounded-3xl shadow-sm`}>
                
                {/* OAB NUMERO */}
                <input
                    type="number"
                    placeholder="Número OAB"
                    value={oabNumero}
                    onChange={(e) => setOabNumero(e.target.value)}
                    className="w-full sm:w-1/4 p-2 border-none focus:ring-0 rounded-l-2xl text-gray-900 text-center"
                    required
                />

                {/* OAB UF: TROCADO DE SELECT PARA INPUT C/ DATALIST */}
                <input
                    type="text"
                    list="uf-options" // Liga este input ao datalist abaixo
                    placeholder="UF"
                    value={oabUf}
                    title='Unidade Federativa'
                    onChange={(e) => setOabUf(e.target.value.toUpperCase())} // 🚨 Garante que seja maiúsculas
                    className="w-full sm:w-1/6 p-2 border-none focus:ring-0 text-gray-900 text-center bg-white uppercase"
                    required
                    maxLength={2} // Limita a entrada a 2 caracteres
                />

                {/* DATALIST: Fornece as sugestões para o input acima */}
                <datalist id="uf-options">
                    {ESTADOS_BRASIL.map((e) => (
                        <option key={e.uf} value={e.uf} />
            ))}
                </datalist>

                {/* DATA INICIAL */}
                <input
                    type="date"
                    placeholder="Data Inicial"
                    value={dataInicial}
                    onChange={(e) => setDataInicial(e.target.value)}
                    className="w-full sm:w-1/4 p-2 border-none focus:ring-0 text-center text-gray-600"
                    max={dataFinal}
                    required
                />
                
                {/* DATA FINAL */}
                <input
                    type="date"
                    placeholder="Data Final"
                    value={dataFinal}
                    onChange={(e) => setDataFinal(e.target.value)}
                    className="w-full sm:w-1/4 p-2 border-none focus:ring-0 rounded-r-2xl text-center text-gray-600"
                    min={dataInicial}
                    required
                />
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="flex justify-center space-x-4 pt-2">
                <button type="submit" className={buttonClass} disabled={state === 'LOADING'}>
                    <Search className="w-5 h-5 mr-2" />
                    {state === 'LOADING' ? 'Buscando...' : 'Pesquisar'}
                </button>
                
                {isDownloadEnabled && (
                    <button 
                        type="button" 
                        onClick={handleDownload} 
                        className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full shadow-lg shadow-green-500/30 transition duration-300"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Baixar ICS
                    </button>
                )}
            </div>

            {/* Créditos no modo embed (Mantenha se necessário) */}
            {isEmbedded && (
                <>            
                    <a
                        // O caminho aponta para o arquivo na pasta 'public'
                        href="https://r2servicos.adv.br" 
                        target="_blank"
                        // Estilo simples e discreto
                        className="mt-10 text-xs text-center text-blue-600 hover:text-blue-800 underline transition-colors"
                        // Acessibilidade (caso o linter reclame de links sem descrição)
                        aria-label="Visualizar guia de integração do widget Task Pilot"
                    >
                        Navegar para ServicosAdvBr
                    </a> 
                    <p className="mt-4 text-xs text-center text-gray-400">
                        R2 Tecnologia de busca fornecida por Task Pilot.
                    </p>    
                </>   
            )}        
            
            {/* DISPLAY DE RESULTADOS */}
            <ResultDisplay state={state} results={results} errorMsg={errorMsg} />
        </form>
    );
};

export default TaskSearchForm;