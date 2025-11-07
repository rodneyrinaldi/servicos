// features/auth/components/LoginForm.tsx
'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
// 🚨 Assumindo que este hook será criado em features/auth/hooks/useAuth.ts
import { useAuth } from '../hooks/useAuth'; 
// Assumindo que a logo é um componente global ou um SVG/imagem
import Logo from '../../../components/Logo'; 

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 🚨 Assumindo que useAuth fornece a função de login e o estado de carregamento
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const isFormValid = useMemo(() => {
    // Validação básica: Email deve ter '@' e senha deve ter pelo menos 6 caracteres
    return email.includes('@') && password.length >= 6;
  }, [email, password]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError('Por favor, insira um email válido e uma senha com pelo menos 6 caracteres.');
      return;
    }

    try {
      // Chama a função de login do hook
      const success = await login(email, password);

      if (success) {
        // Redireciona para o dashboard ou rota protegida após o sucesso
        router.push('/dashboard');
      } else {
        // Se a função login retornar false (erro tratado pelo hook)
        setError('Email ou senha inválidos. Tente novamente.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Erro inesperado (ex: falha de rede)
      setError(err.message || 'Ocorreu um erro inesperado ao tentar fazer login.');
    }
  }, [email, password, isFormValid, login, router]);


  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl border border-gray-100">
      
      {/* Cabeçalho do Formulário */}
      <div className="mb-6 text-center">
        {/* Placeholder para o seu Logo/Marca */}
        <div className="mx-auto w-12 h-12 mb-3">
            <Logo /> 
            <span className="text-4xl text-blue-600">🔑</span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Acessar sua Conta</h2>
        <p className="text-gray-500 text-sm">Entre para acessar suas notificações PJe</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Campo de Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
        </div>

        {/* Campo de Senha */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {/* Botão de Submissão */}
        <button
          type="submit"
          disabled={isLoading || !isFormValid}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                      ${isLoading || !isFormValid 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`
                    }
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      
    </div>
  );
};

export default LoginForm;