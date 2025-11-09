// features/search-widget/components/ResultDisplay.tsx
import React from 'react';
import { Loader2, AlertTriangle, CalendarCheck } from 'lucide-react';

// 1. Importação de Tipos Globais
// Caminho ajustado: Sai de features/search-widget/components (../..), e entra em /types/
import { ProcessoResumo } from '../../../types'; 

// 2. Importação de Tipos Locais da Feature
// Caminho ajustado: Volta um nível (.) para o types.ts dentro de features/search-widget/
import { SearchState } from '../types'; 

interface ResultDisplayProps {
    state: SearchState;
    results: ProcessoResumo[];
    errorMsg: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ state, results, errorMsg }) => {
    switch (state) {
        case 'LOADING':
            return (
                <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin text-blue-600" />
                    <span className="text-blue-700 font-medium">Buscando comunicações...</span>
                </div>
            );

        case 'ERROR':
            return (
                <div className="p-6 bg-red-50 border border-red-300 rounded-lg flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-3 text-red-600" />
                    <span className="text-red-800 font-medium">{errorMsg || "Ocorreu um erro desconhecido."}</span>
                </div>
            );

        case 'RESULTS':
            if (results.length === 0) {
                 return (
                    <div className="p-6 bg-yellow-50 border border-yellow-300 rounded-lg text-center">
                        <span className="text-yellow-800 font-medium">Nenhuma comunicação encontrada no período para esta OAB.</span>
                    </div>
                );
            }
            
            return (
                <div className="mt-6">
                    <div className="flex items-center text-green-700 font-semibold mb-3">
                        <CalendarCheck className="w-5 h-5 mr-2 fill-green-500 text-white" />
                        <span>{results.length} Prazos Encontrados:</span>
                    </div>
                    <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {results.map((p, index) => (
                            <li key={index} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm text-sm">
                                <span className="font-semibold text-gray-800 mr-2">{p.data}</span>
                                <span className="text-gray-600 block sm:inline">{p.numero}</span>
                                <span className="text-gray-500 text-xs block mt-1">{p.descricao}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
            
        case 'IDLE':
        default:
            return null;
    }
};

export default ResultDisplay;