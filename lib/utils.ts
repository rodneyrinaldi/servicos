// src/lib/utils.ts
// Funções utilitárias e de manipulação de dados/ambiente.

/**
 * Retorna a data de hoje no formato YYYY-MM-DD.
 * @returns {string} Data atual formatada.
 */
export const getTodayDate = (): string => new Date().toISOString().split('T')[0];

/**
 * Serviço simples para manipulação de cookies no lado do cliente.
 */
export const CookieService = {
    
    /**
     * Obtém o valor de um cookie.
     * @param {string} name - O nome do cookie.
     * @returns {string | undefined} O valor do cookie ou undefined se não encontrado.
     */
    get: (name: string): string | undefined => {
        // Garante que a função só é executada no ambiente do navegador (client-side)
        if (typeof document === 'undefined') return undefined;
        
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift();
        }
        return undefined;
    },
    
    /**
     * Define um cookie com um valor e data de expiração.
     * @param {string} name - O nome do cookie.
     * @param {string} value - O valor a ser armazenado.
     * @param {number} [days=365] - Número de dias para expiração.
     */
    set: (name: string, value: string, days: number = 365) => {
        // Garante que a função só é executada no ambiente do navegador (client-side)
        if (typeof document === 'undefined') return;
        
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `; expires=${date.toUTCString()}`;
        
        document.cookie = `${name}=${value}${expires}; path=/`;
    },
    
    /**
     * Define um cookie com um valor uf nulo.
     * @param {string} name - O nome do cookie.
     * @param {string} value - O valor a ser armazenado.
     * @param {number} [days=365] - Número de dias para expiração.
     */
    del: (name: string, value: string, days: number = 365) => {
        // Garante que a função só é executada no ambiente do navegador (client-side)
        if (typeof document === 'undefined') return;
        
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `; expires=${date.toUTCString()}`;
        
        document.cookie = `${name}=${value}${expires}; path=/`;
    }
};