// features/search-widget/api.ts (VERSÃO CORRIGIDA)

import { ComunicacaoItem, ProcessoResumo } from '../../types/index'; 
import { API_BASE_URL } from '../../lib/constants'; // Presumindo que você moveu a constante para cá


export const fetchPjeCommunications = async (
    oabNumero: string,
    oabUf: string,
    dataInicial: string,
    dataFinal: string
): Promise<ProcessoResumo[]> => {
    
    // CORREÇÃO DOS NOMES DOS PARÂMETROS
    const params = new URLSearchParams({
        numeroOab: oabNumero, // Nome do parâmetro corrigido
        ufOab: oabUf,         // Nome do parâmetro corrigido
        dataDisponibilizacaoInicio: dataInicial, // Nome do parâmetro corrigido
        dataDisponibilizacaoFim: dataFinal,     // Nome do parâmetro corrigido
        pagina: '1',         // Parâmetro extra adicionado
        itensPorPagina: '100'// Parâmetro extra adicionado
    });

    const url = `${API_BASE_URL}?${params.toString()}`;

    try {
        const response = await fetch(url);
        
        // CORREÇÃO DO TRATAMENTO DE ERROS
        if (!response.ok) {
            let message = `Erro ao buscar comunicações (Status: ${response.status}).`;
            const errorData = await response.json().catch(() => ({})); // Tenta ler o JSON de erro

            if (response.status === 422) {
                 message = errorData.message || 'Erro negocial (422). Verifique os dados de entrada.';
            } else if (response.status === 429) {
                 message = 'Taxa de requisições excedida (429). Tente novamente mais tarde.';
            } else if (errorData.message) {
                 message = errorData.message;
            }
            throw new Error(message);
        }
        
        // CORREÇÃO DA ESTRUTURA DE RESPOSTA
        const data = await response.json();
        // Acessa a lista de itens dentro do objeto de resposta
        const apiItems: ComunicacaoItem[] = data.items || []; 
        
        if (!Array.isArray(apiItems)) {
             throw new Error("Resposta da API inválida: Lista de itens não encontrada.");
        }

        // CORREÇÃO DO MAPEAMENTO DOS DADOS (usando a lógica original)
        return apiItems.map(item => ({
            data: item.data_disponibilizacao.split('T')[0], // Mantenha o split se só precisa da data
            descricao: `${item.tipoComunicacao || ''} - ${item.texto || item.nomeOrgao || 'Sem detalhes de comunicação'}`,
            numero: item.numeroprocessocommascara || item.numero_processo || 'N/A', 
        }));

    } catch (error) {
        console.error("Erro ao buscar dados do PJe:", error);
        throw new Error(error instanceof Error ? error.message : 'Falha na comunicação com a API.');
    }
};