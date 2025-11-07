// features/auth/hooks/useAuth.ts
'use client'
import { useState, useCallback, useEffect, useMemo } from 'react';
import { loginApi, registerApi, logoutApi } from '../api'; // Funções de API a serem criadas
import { User, LoginCredentials } from '../types'; // Tipos de dados (User, credenciais, etc.)
import { CookieService } from '../../../lib/utils'; // Serviço de Cookie para persistência

// Chave para armazenar o token ou dados do usuário no cookie/localStorage
const USER_STORAGE_KEY = 'taskpilot_user_session';

// Simulação de recuperação inicial do usuário a partir do armazenamento
const getInitialUser = (): User | null => {
    try {
        const storedData = CookieService.get(USER_STORAGE_KEY);
        if (storedData) {
            // Se o token ou user for complexo, ele deve ser parseado de JSON
            return JSON.parse(storedData) as User; 
        }
    } catch (e) {
        console.error("Erro ao recuperar sessão inicial:", e);
        // Limpar dado corrompido
        CookieService.del(USER_STORAGE_KEY,""); 
    }
    return null;
};

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(getInitialUser);
    const [isLoading, setIsLoading] = useState(false);

    // Estado computado
    const isAuthenticated = useMemo(() => !!user, [user]);

    // Função para salvar a sessão (geralmente salva o token JWT e dados básicos do usuário)
    const saveSession = useCallback((userData: User) => {
        // Assume que User é um objeto que pode ser stringificado
        CookieService.set(USER_STORAGE_KEY, JSON.stringify(userData), 7); // Salva por 7 dias
        setUser(userData);
    }, []);

    // ----------------------------------------
    // 1. LOGIN
    // ----------------------------------------
    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            // A API deve retornar os dados do usuário (ex: { id: 1, email: 'user@a.com', token: 'jwt...' })
            const userData = await loginApi({ email, password }); 
            
            if (userData) {
                saveSession(userData);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Falha no Login:', error);
            setUser(null);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [saveSession]);

    // ----------------------------------------
    // 2. REGISTER
    // ----------------------------------------
    const register = useCallback(async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            // A API de registro pode retornar um token e dados (fazendo login automático)
            const userData = await registerApi({ email, password }); 

            if (userData) {
                // Login automático após o cadastro
                saveSession(userData); 
                return true;
            }
            return false;
        } catch (error) {
            console.error('Falha no Cadastro:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [saveSession]);
    
    // ----------------------------------------
    // 3. LOGOUT
    // ----------------------------------------
    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await logoutApi(); // Opcional: Chama API para invalidar token no servidor
        } catch (error) {
            // Não fazemos nada com o erro de logout, apenas garantimos a limpeza local
            console.warn('Erro ao chamar API de Logout, mas limpando sessão local.');
        } finally {
            CookieService.del(USER_STORAGE_KEY,"");
            setUser(null);
            setIsLoading(false);
            // Opcional: Redirecionar o usuário para a página inicial ou de login
            // router.push('/login');
        }
    }, []);
    

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
    };
};

// 🚨 Lembre-se de criar os seguintes arquivos para completar a funcionalidade:
// 1. features/auth/types/index.ts (Definição de User, LoginCredentials)
// 2. features/auth/api/index.ts (Implementação de loginApi, registerApi, logoutApi)