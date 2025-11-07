// features/auth/components/RegisterForm.tsx
'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
// 🚨 Assumindo que o mesmo hook gerencia login e registro
import { useAuth } from '../hooks/useAuth'; 
import Link from 'next/link';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 🚨 Assumindo que useAuth fornece a função de registro e o estado de carregamento
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const isFormValid = useMemo(() => {
    // Validação básica: Email válido, senhas iguais e com comprimento mínimo
    return (
      email.includes('@') && 
      password.length >= 6 && 
      password === confirmPassword
    );
  }, [email, password, confirmPassword]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    if (!isFormValid) {
      setError('Por favor, preencha todos os campos corretamente. A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    try {
      // Chama a função de registro do hook
      const success = await register(email, password);

      if (success) {
        // Redireciona para uma página de sucesso ou dashboard após o cadastro
        router.push('/cadastro/sucesso'); 
      } else {
        // Se a função register retornar false (erro tratado pelo hook)
        setError('Ocorreu um erro no cadastro. Este email já está em uso ou a senha é muito fraca.');
      }
    } catch (err: any) {
      // Erro inesperado (ex: falha de rede)
      setError(err.message || 'Ocorreu um erro inesperado ao tentar se cadastrar.');
    }
  }, [email, password, confirmPassword, isFormValid, register, router]);


  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl border border-gray-100">
      
      {/* Cabeçalho do Formulário */}
      <div className="mb-6 text-center">
        {/* Placeholder para o seu Logo/Marca */}
        <div className="mx-auto w-12 h-12 mb-3">
            <span className="text-4xl text-blue-600">📝</span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Criar Sua Conta</h2>
        <p className="text-gray-500 text-sm">É rápido e fácil. Comece a monitorar seus prazos agora!</p>
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha (mínimo 6 caracteres)</label>
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

        {/* Campo de Confirmação de Senha */}
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
          <input
            id="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
          {password && confirmPassword && password !== confirmPassword && (
            <p className="mt-1 text-xs text-red-500">As senhas digitadas não coincidem.</p>
          )}
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
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p>
          Já tem uma conta?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Faça Login
          </Link>
        </p>
      </div>
      
    </div>
  );
};

export default RegisterForm;