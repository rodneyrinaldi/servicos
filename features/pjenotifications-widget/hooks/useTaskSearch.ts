// features/search-widget/hooks/useTaskSearch.ts
import { useState, useCallback, useEffect } from 'react'; // 🚨 IMPORTANTE: Adicionar useEffect
// Importa utilidades globais
import { getTodayDate, CookieService } from '../../../lib/utils';
// Importa tipos específicos da feature
import { SearchState, SearchParams } from '../types'; 
// Importa a lógica de API da feature
import { fetchPjeCommunications } from '../api';
// Importa o tipo global de retorno
import { ProcessoResumo } from '../../../types'; 

// Funções de inicialização lenta (apenas no cliente)
const initializeOabNumero = () => CookieService.get('oabNumero') || '';
const initializeOabUf = () => CookieService.get('oabUf') || '';

export const useTaskSearch = () => {
    // 1. ESTADOS DO FORMULÁRIO
    const [oabNumero, setOabNumero] = useState(initializeOabNumero);
    const [oabUf, setOabUf] = useState(initializeOabUf); 
    const [dataInicial, setDataInicial] = useState(getTodayDate());
    const [dataFinal, setDataFinal] = useState(getTodayDate());

    // 2. ESTADOS DO RESULTADO
    const [state, setState] = useState<SearchState>('IDLE');
    const [results, setResults] = useState<ProcessoResumo[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // --- CORREÇÃO: PERSISTÊNCIA DA UF NO COOKIE ---
    // Sempre que oabUf muda (pelo setOabUf no <select>), salva no cookie
    useEffect(() => {
        if (oabUf) {
            // Assumimos que o CookieService.set lida com o salvamento
            CookieService.set('oabUf', oabUf);
        } else {
             // Se o usuário selecionar a opção vazia ("UF"), limpamos o cookie
             CookieService.del('oabUf', "");
        }
    }, [oabUf]);
    
    // NOTA: Seria ideal adicionar um useEffect similar para oabNumero aqui, 
    // se o setOabNumero não estiver fazendo a persistência internamente.

    // 3. HANDLER DE BUSCA (Lógica principal)
    const handleSearch = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!oabNumero || !oabUf) {
            setErrorMsg("Por favor, preencha o número da OAB e a UF.");
            setState('ERROR');
            return;
        }

        setState('LOADING');
        setResults([]);
        setErrorMsg(null);

        try {
            const fetchedResults = await fetchPjeCommunications(
                oabNumero,
                oabUf,
                dataInicial,
                dataFinal
            );

            setResults(fetchedResults);
            setState(fetchedResults.length > 0 ? 'RESULTS' : 'IDLE');

        } catch (err: any) {
            setErrorMsg(err.message || "Ocorreu um erro desconhecido durante a busca.");
            setState('ERROR');
        }
    }, [oabNumero, oabUf, dataInicial, dataFinal]);

    // Retorna todos os estados e handlers para o componente TaskSearchForm consumir
    return {
        // Form states
        oabNumero, setOabNumero,
        oabUf, setOabUf,
        dataInicial, setDataInicial,
        dataFinal, setDataFinal,
        // Result states
        state,
        results,
        errorMsg,
        // Handlers
        handleSearch,
        // Computed
        isDownloadEnabled: state === 'RESULTS' && results.length > 0,
    };
};
