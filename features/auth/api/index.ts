// features/auth/api/index.ts

import { 
    LoginCredentials, 
    RegisterCredentials, 
    AuthResponse,
    User 
} from '../types';

// Função auxiliar para simular o delay de uma requisição de rede
const simulateApiCall = (delay = 1000) => new Promise(resolve => setTimeout(resolve, delay));

// -----------------------------------------------------------
// Simulação de Dados para Usuários
// -----------------------------------------------------------

// Usuário Fictício para Teste
const MOCK_USER: User = {
    id: 42,
    email: 'test@adv.br',
    name: 'Dr. Mock User',
    oabNumero: '12345',
    oabUf: 'SP',
    token: 'mock-jwt-token-abc12345'
};

// -----------------------------------------------------------
// 1. Função de Login
// -----------------------------------------------------------

/**
 * Simula uma chamada API POST para autenticar o usuário.
 * Em um projeto real, isso usaria fetch ou axios.
 */
export const loginApi = async ({ email, password }: LoginCredentials): Promise<AuthResponse> => {
    await simulateApiCall(1500); // Simula 1.5 segundos de latência

    // 🚨 Lógica de Simulação: Apenas o usuário de teste funciona
    if (email === MOCK_USER.email && password === 'senha123') {
        // Sucesso: Retorna o objeto User com o token
        return MOCK_USER;
    } 
    
    // Falha: Lança um erro (o useAuth irá capturá-lo)
    throw new Error('Credenciais inválidas. Verifique seu email e senha.');
};

// -----------------------------------------------------------
// 2. Função de Cadastro (Sign Up)
// -----------------------------------------------------------

/**
 * Simula uma chamada API POST para registrar um novo usuário.
 * Geralmente, retorna os dados do usuário e um token de acesso.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerApi = async ({ email, password }: RegisterCredentials): Promise<AuthResponse> => {
    await simulateApiCall(2000); // Simula 2.0 segundos de latência

    // 🚨 Lógica de Simulação: 
    // Em um ambiente de produção, aqui verificaria se o email já existe.
    if (email === MOCK_USER.email) {
        throw new Error('Este email já está cadastrado em nosso sistema.');
    }

    // Sucesso: Simula o novo usuário e o login automático
    const newUser: User = {
        id: Math.floor(Math.random() * 1000) + 100, // ID aleatório
        email: email,
        name: email.split('@')[0],
        token: `new-user-token-${Date.now()}`
    };

    return newUser;
};

// -----------------------------------------------------------
// 3. Função de Logout
// -----------------------------------------------------------

/**
 * Simula uma chamada API POST para invalidar o token no servidor (opcional, mas boa prática).
 */
export const logoutApi = async (): Promise<void> => {
    await simulateApiCall(500); // Simula 0.5 segundos de latência
    // Em produção, aqui você enviaria o token atual para o servidor
    // para que ele seja adicionado a uma lista de bloqueio (blacklist).
    
    // Como é simulação, apenas resolve (sucesso)
    return;
};