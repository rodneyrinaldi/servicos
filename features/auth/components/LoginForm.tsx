'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';

interface MockAuthContextType {
    login: (email: string, password: string) => Promise<boolean>;
    isLoading: boolean;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
    );
}

type RouterInstance = { push: (path: string) => Promise<boolean> };

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const { login, isLoading } = useAuth() as unknown as MockAuthContextType;
    const router = useRouter() as unknown as RouterInstance;

    const isFormValid = useMemo(() => {
        return email.includes('@') && password.length >= 6;
    }, [email, password]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');
        setSuccess(false);

        if (!isFormValid) {
            setError('Preencha todos os campos corretamente. A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        try {
            const isSuccessful = await login(email, password);

            if (isSuccessful) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            } else {
                setError('Email ou senha inválidos. Verifique suas credenciais.');
            }
        } catch (err) {
            let errorMessage = 'Erro inesperado ao tentar fazer login.';

            if (isErrorWithMessage(err)) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }

            setError(errorMessage);
        }
    }, [email, password, isFormValid, login, router]);

    return (
        <div className="w-full max-w-sm flex justify-center items-start bg-gray-50">
            {success ? (
                <div className="w-full max-w-sm p-6 bg-green-50 rounded-lg shadow-xl border border-green-200 text-center">
                    <div className="mx-auto w-12 h-12 mb-3">
                        <span className="text-4xl text-green-600">✅</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-green-800 mb-2">Login realizado!</h2>
                    <p className="text-gray-700">Você será redirecionado em instantes.</p>
                </div>
            ) : (
                <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl border border-gray-100">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Acesso</h2>
                        <p className="text-gray-500 text-sm">Entre com uma conta válida</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        {error && (
                            <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                                {error}
                            </div>
                        )}

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

                    <div className="mt-6 text-center text-sm text-gray-700">
                        <p>
                            Não tem uma conta?{' '}
                            <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Cadastre-se
                            </Link>
                        </p>
                        <p className="mt-2">
                            Esqueceu a senha?{' '}
                            <Link href="/resetpwd" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Redefinir
                            </Link>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
