'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth'; 
import Link from 'next/link';

// Interface Mock para corrigir TS2339 e TS2352, assumindo o formato mínimo do hook useAuth
interface MockAuthContextType {
    updatePassword: (password: string) => Promise<boolean>;
    isLoading: boolean;
    // Adicione aqui outras propriedades obrigatórias que seu hook real retorna
    // Ex: user: any; isAuthenticated: boolean; login: any; register: any;
}

// Type Predicate para tratar o erro TS18046 e eliminar o 'as any'
function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
    );
}

// Definindo um tipo mínimo para o router que contém a função push (Correção TS2305)
type RouterInstance = { push: (path: string) => Promise<boolean> };

const UpdatePwdForm: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // O estado de erro é tipado como 'string' e inicializado com '' (Correção TS2345)
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    // Tipagem forçada com double casting para o hook (Correção TS2352)
    const { updatePassword, isLoading } = useAuth() as unknown as MockAuthContextType;
    
    // Forçando o tipo de retorno do useRouter para ter a função 'push' (Correção TS2305)
    const router = useRouter() as unknown as RouterInstance;

    const isFormValid = useMemo(() => {
        return (
            password.length >= 6 && 
            password === confirmPassword
        );
    }, [password, confirmPassword]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        setError('');
        setSuccess(false);

        if (password !== confirmPassword) {
            setError('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        if (!isFormValid) {
            setError('Por favor, preencha a nova senha corretamente. A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        try {
            const isSuccessful = await updatePassword(password); 

            if (isSuccessful) {
                setSuccess(true);
                // Redireciona para o login após um breve delay
                setTimeout(() => {
                    router.push('/login?reset_success=true');
                }, 1500);
            } else {
                setError('Ocorreu um erro ao recadastrar a senha. Tente novamente mais tarde.');
            }
        } catch (err) {
            // Uso do Type Predicate para tratar 'err' de forma segura (Correção TS18046)
            let errorMessage: string = 'Ocorreu um erro inesperado ao tentar recadastrar a senha.';
            
            if (isErrorWithMessage(err)) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }
            
            setError(errorMessage);
        }
    }, [password, confirmPassword, isFormValid, updatePassword, router]);

    return (
        // Layout: Centralizado horizontalmente, alinhado ao topo (items-start) com margem superior (pt-20)
        <div className="w-full max-w-sm flex justify-center items-start bg-gray-50">
            
            {success ? (
                // Bloco de Sucesso
                <div className="w-full max-w-sm p-6 bg-green-50 rounded-lg shadow-xl border border-green-200 text-center">
                    <div className="mx-auto w-12 h-12 mb-3">
                        <span className="text-4xl text-green-600">✅</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-green-800 mb-2">Sucesso!</h2>
                    <p className="text-gray-700">Sua senha foi atualizada. Você será redirecionado para a tela de login em instantes.</p>
                    <Link 
                        href="/login"
                        className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        Ir para Login agora
                    </Link>
                </div>
            ) : (
                // Bloco do Formulário
                <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl border border-gray-100">
                    
                    {/* Cabeçalho do Formulário */}
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Senhas</h2>
                        <p className="text-gray-500 text-sm">Recadastre uma nova senha</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Campo de Nova Senha */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nova Senha (mínimo 6 caracteres)</label>
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
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
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
                            {isLoading ? 'Atualizando...' : 'Recadastrar Senha'}
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center text-sm text-gray-700">
                        <p>
                            Lembrou da sua senha?{' '}
                            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Voltar para o Login
                            </Link>
                        </p>
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default UpdatePwdForm;