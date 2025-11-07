// features/auth/types/index.ts

// -----------------------------------------------------------
// 1. Tipos de Dados do Usuário (Retorno da API)
// -----------------------------------------------------------

/**
 * Define a estrutura dos dados do usuário armazenados na sessão.
 * Inclui o token necessário para futuras requisições autenticadas.
 */
export interface User {
  id: number;
  email: string;
  name?: string; // Nome é opcional no início
  oabNumero?: string; // Informações específicas da aplicação
  oabUf?: string;
  token: string; // Token de autenticação (JWT, etc.)
}


// -----------------------------------------------------------
// 2. Tipos de Credenciais (Inputs do Formulário)
// -----------------------------------------------------------

/**
 * Tipos para as credenciais usadas na função de Login.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** ✅ CORREÇÃO: Use type alias quando não há adição de membros. */
export type RegisterCredentials = LoginCredentials;

/**
 * Tipos para as credenciais usadas na função de Cadastro.
 * No nosso caso, é o mesmo que LoginCredentials, mas poderia incluir 'confirmPassword'.
 */
// export interface RegisterCredentials extends LoginCredentials {
  // Poderia ter outros campos aqui, como:
  // firstName?: string;
  // lastName?: string;


// -----------------------------------------------------------
// 3. Tipos de Resposta da API
// -----------------------------------------------------------

/**
 * Tipo de retorno esperado das funções de API de login e registro em caso de sucesso.
 * Se houver um erro, a função deve LER um erro e Lançar (throw) uma exceção.
 */
export type AuthResponse = User;

/**
 * Tipo genérico para erros de validação da API.
 */
export interface ApiError {
  code: string;
  message: string;
  fields?: { [key: string]: string }; // Para erros específicos de campo (e.g., email: 'já existe')
}