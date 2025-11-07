// src/lib/api.ts
import { API_BASE_URL } from '../data/constants';
import { ComunicacaoItem, ProcessoResumo } from '../types';

export interface SearchParams {
    oabNumero: string;
    oabUf: string;
    dataInicial: string;
    dataFinal: string;
}

export const fetchPjeCommunications = async ({ oabNumero, oabUf, dataInicial, dataFinal }: SearchParams): Promise<ProcessoResumo[]> => {
    
    const url = `${API_BASE_URL}?` + new URLSearchParams({
        numeroOab: oabNumero,
        ufOab: oabUf,
        dataDisponibilizacaoInicio: dataInicial,
        dataDisponibilizacaoFim: dataFinal,
        pagina: '1',
        itensPorPagina: '100'
    }).toString();
    
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
    
    return mappedResults;
};