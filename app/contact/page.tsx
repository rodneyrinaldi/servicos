// app/(auth)/forgot-password/page.tsx

"use client"; 

import React from 'react';
import Link from 'next/link';

const ForgotPassword: React.FC = () => {
    // ... (Hooks e funções de estado permanecem os mesmos)
    const [email, setEmail] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // ... (Lógica de envio permanece a mesma)
        if (!email) {
            setStatusMessage("Por favor, digite seu email.");
            return;
        }

        setIsLoading(true);
        setStatusMessage("Enviando solicitação...");
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (email.includes('@')) {
             setStatusMessage("✅ Instruções de recuperação foram enviadas para o seu email, se a conta existir.");
        } else {
             setStatusMessage("❌ Ocorreu um erro ao processar sua solicitação.");
        }

        setIsLoading(false);
    };

    return (
        // 🚨 ENVOLTÓRIO DE CONTROLE (Garantindo que a centralização e o fundo claro ocorram se o AuthLayout falhar)
        // Se o AuthLayout estiver funcionando, este div externo será redundante, mas funciona como um seguro.
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">

                {/* --- A PARTIR DAQUI É O CONTEÚDO ORIGINAL DO FORMULÁRIO --- */}
                <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl border border-gray-100">
                    
                    {/* Cabeçalho do Formulário */}
                    <div className="mb-6 text-center">
                        <div className="mx-auto text-4xl text-yellow-500 mb-3">
                            <span role="img" aria-label="cadeado">🔒</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">Esqueceu sua Senha?</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Digite seu email para receber um link de redefinição.
                        </p>
                    </div>

                    {/* Formulário */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* ... (Campos de input e botão permanecem os mesmos) ... */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setStatusMessage('');
                                    }}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Mensagem de Status (Sucesso/Erro) */}
                        {statusMessage && (
                            <div className={`p-3 rounded-md text-sm ${statusMessage.startsWith('✅') ? 'bg-green-50 text-green-700' : statusMessage.startsWith('❌') ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                                {statusMessage}
                            </div>
                        )}

                        {/* Botão de Envio */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition"
                            >
                                {isLoading ? 'Enviando...' : 'Redefinir Senha'}
                            </button>
                        </div>
                    </form>

                    {/* Link de Retorno */}
                    <div className="mt-6 text-center">
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 text-sm">
                            Lembrei da minha senha. Voltar ao Login.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;