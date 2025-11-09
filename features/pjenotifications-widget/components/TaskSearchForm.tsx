// features/search-widget/components/TaskSearchForm.tsx
'use client'; 
import React, { useCallback } from 'react';
import { Download, Search } from 'lucide-react';

// 1. Importa o Hook que contém toda a lógica e estados
import { useTaskSearch } from '../hooks/useTaskSearch';

// 2. Importa utilidades globais (para o download ICS)
import { createICSContent } from '../../../lib/ics';

// 3. Importa dados estáticos
import { ESTADOS_BRASIL } from '../../landing-page/data'; 

// 4. Importa o componente de visualização de resultados
import ResultDisplay from './ResultDisplay';

interface TaskSearchFormProps {
    primaryColor?: string; 
    isEmbedded?: boolean; 
    // 💡 heightClass reintroduzida para controle de altura em desktop/embed
    heightClass?: string; 
}

const TaskSearchForm: React.FC<TaskSearchFormProps> = ({ 
    primaryColor = 'blue-600', 
    isEmbedded = false,
    heightClass = 'min-h-[400px] h-full' 
}) => {
    
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

    // LÓGICA DE DOWNLOAD
    const handleDownload = useCallback(() => {
        if (!results || results.length === 0) return;

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
    const primaryBgClass = primaryColor.startsWith('bg-') ? primaryColor : `bg-${primaryColor}`;
    const primaryHoverClass = primaryColor.startsWith('bg-') ? primaryColor.replace('bg-', 'hover:bg-') : `hover:bg-blue-700`;
    
    const buttonClass = `flex items-center justify-center ${primaryBgClass} ${primaryHoverClass} text-white font-medium px-4 py-2 text-sm rounded-full shadow-lg shadow-blue-500/30 transition duration-300 disabled:opacity-50 disabled:shadow-none sm:px-6 sm:py-3 sm:text-base`;
    
    // O container principal não terá altura mínima, a menos que 'isEmbedded' seja true.
    const containerClasses = isEmbedded 
        ? `${heightClass} flex flex-col space-y-3 p-3 border rounded-xl shadow-md bg-white sm:space-y-4 sm:p-4` 
        : `flex flex-col space-y-3 sm:space-y-4`; 

    // Variável para controlar se a área de resultados deve ser exibida/expandida
    const shouldDisplayResultsArea = state !== 'IDLE' || results.length > 0 || errorMsg;

    return (
        <form onSubmit={handleSearch} className={`w-full ${containerClasses}`}> 
            
            {/* INPUTS */}
            <div className={`flex flex-col sm:flex-row items-stretch space-y-2 sm:space-y-0 sm:space-x-3 p-2 bg-white border border-gray-200 rounded-3xl shadow-sm sm:p-3`}>
                
                {/* OAB NUMERO */}
                <input
                    type="number"
                    placeholder="Número OAB"
                    value={oabNumero}
                    onChange={(e) => setOabNumero(e.target.value)}
                    className="w-full sm:flex-1 p-1.5 border-none focus:ring-0 rounded-l-2xl text-gray-900 text-left text-sm sm:text-base"
                    required
                />

                {/* OAB UF */}
                <input
                    type="text"
                    list="uf-options"
                    placeholder="UF"
                    value={oabUf}
                    title='Unidade Federativa'
                    onChange={(e) => setOabUf(e.target.value.toUpperCase())}
                    className="w-full sm:w-1/5 p-1.5 border-none focus:ring-0 text-gray-900 text-left bg-white uppercase text-sm sm:text-base"
                    required
                    maxLength={2}
                />

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
                    className="w-full sm:flex-1 p-1.5 border-none focus:ring-0 text-left text-gray-900 text-sm sm:text-base"
                    max={dataFinal}
                    required
                />
                
                {/* DATA FINAL */}
                <input
                    type="date"
                    placeholder="Data Final"
                    value={dataFinal}
                    onChange={(e) => setDataFinal(e.target.value)}
                    className="w-full sm:flex-1 p-1.5 border-none focus:ring-0 rounded-r-2xl text-left text-gray-900 text-sm sm:text-base"
                    min={dataInicial}
                    required
                />
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <button type="submit" className={buttonClass} disabled={state === 'LOADING'}>
                    <Search className="w-4 h-4 mr-2 sm:w-5 sm:h-5" />
                    {state === 'LOADING' ? 'Buscando...' : 'Pesquisar'}
                </button>
                
                {isDownloadEnabled && (
                    <button 
                        type="button" 
                        onClick={handleDownload} 
                        className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 text-sm rounded-full shadow-lg shadow-green-500/30 transition duration-300 sm:px-6 sm:py-3 sm:text-base"
                    >
                        <Download className="w-4 h-4 mr-2 sm:w-5 sm:h-5" />
                        Baixar ICS
                    </button>
                )}
            </div>

            {/* Créditos no modo embed */}
            {isEmbedded && (
                <div className="flex flex-col items-center pt-2">
                    <a
                        href="https://servicos.adv.br" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline transition-colors" 
                        aria-label="Visualizar guia de integração do widget Task Pilot"
                    >
                        <p className="mt-2 text-xs text-center">
                            https://servicos.adv.br
                        </p>
                    </a> 
                    <p className="mt-1 text-xs text-center text-gray-400">
                        RRS Rodney Rinaldi Soluções - Notificações PJe
                    </p>
                </div>
            )}
            
            {/* DISPLAY DE RESULTADOS */}
            {/* 💡 CORREÇÃO FINAL: Usaremos h-auto e removendo max-height e overflow para que cresça ilimitadamente */}
            <div className={`w-full transition-all duration-300 ease-in-out ${
                shouldDisplayResultsArea 
                    ? 'mt-4 h-auto' // Exibe e permite o crescimento de altura natural (sem limites)
                    : 'max-h-0 overflow-hidden' // Esconde totalmente
            }`}>
                <ResultDisplay 
                    state={state} 
                    results={results} 
                    errorMsg={errorMsg} 
                />
            </div>
        </form>
    );
};

export default TaskSearchForm;