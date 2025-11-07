// features/search-widget/types.ts
// Tipos específicos para a Feature de Busca.

// Importa tipos globais da pasta raiz '/types'
import { ProcessoResumo } from '../../types'; 

/**
 * Define os possíveis estados da UI de busca.
 */
export type SearchState = 'IDLE' | 'LOADING' | 'RESULTS' | 'ERROR';

/**
 * Define o contrato para a resposta do Serviço PJe.
 * (Pode ser movido para o api.ts, mas é útil tê-lo aqui)
 */
export type PjeApiResult = {
    // Usamos o tipo global ProcessoResumo, mas encapsulamos em um tipo específico da feature, se necessário.
    data: ProcessoResumo[]; 
    metadata?: any; // Adicione metadados da API aqui, se necessário.
};

// Se você precisar de um tipo para os parâmetros do formulário, ele iria aqui:
export type SearchParams = {
    oabNumero: string;
    oabUf: string;
    dataInicial: string;
    dataFinal: string;
};