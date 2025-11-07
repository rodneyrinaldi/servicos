"use client"; // ESSENCIAL: Permite o uso de hooks do React

import React from 'react';
import Link from 'next/link';
import { Mail, Loader2, Send } from 'lucide-react'; // Ícones mais modernos

// Usamos o Layout de Autenticação para centralização e fundo claro, adaptado para contato.
const ContactUs: React.FC = () => {
    
    // 1. GERENCIAMENTO DE ESTADO
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    
    // 2. FUNÇÃO DE SUBMISSÃO
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validação de Campos
        if (!name || !email || !message) {
            setStatusMessage("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (!email.includes('@')) {
            setStatusMessage("Por favor, digite um endereço de email válido.");
            return;
        }

        setIsLoading(true);
        setStatusMessage("📨 Enviando sua mensagem...");
        
        // Simulação de chamada de API para envio do contato (2 segundos)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulação de resposta da API
        // Em um cenário real, você verificaria o status da resposta do servidor
        if (name.toLowerCase() !== 'erro') { // Simulação: se o nome não for "erro", é sucesso
            setStatusMessage("✅ Mensagem enviada com sucesso! Em breve entraremos em contato.");
            setName('');
            setEmail('');
            setMessage('');
        } else {
            setStatusMessage("❌ Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.");
        }

        setIsLoading(false);
    };

    // Função para limpar a mensagem de status ao interagir com o formulário
    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        setter(value);
        setStatusMessage('');
    };

    return (
        // CAMADA EXTERNA DE LAYOUT: Fundo claro e centralização
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">

                {/* --- CONTEÚDO (Card Branco) --- */}
                <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
                    
                    {/* Cabeçalho do Formulário */}
                    <div className="mb-8 text-center">
                        {/* Ícone de Envelope */}
                        <div className="mx-auto text-4xl text-blue-600 mb-3">
                            <Mail className="w-10 h-10 mx-auto" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900">Fale Conosco</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Preencha o formulário abaixo e nos envie sua dúvida ou sugestão.
                        </p>
                    </div>

                    {/* Formulário */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        {/* Campo Nome */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => handleInputChange(setName, e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Campo Email */}
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
                                    onChange={(e) => handleInputChange(setEmail, e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Campo Mensagem */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
                            <div className="mt-1">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    value={message}
                                    onChange={(e) => handleInputChange(setMessage, e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>


                        {/* Mensagem de Status (Sucesso/Erro/Carregando) */}
                        {statusMessage && (
                            <div className={`p-3 rounded-lg text-sm transition-all duration-300
                                ${statusMessage.startsWith('✅') ? 'bg-green-50 text-green-700 border border-green-200' 
                                : statusMessage.startsWith('❌') ? 'bg-red-50 text-red-700 border border-red-200' 
                                : 'bg-blue-50 text-blue-700 border border-blue-200'}`}
                            >
                                {statusMessage}
                            </div>
                        )}

                        {/* Botão de Envio */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Enviar Mensagem
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Link de Retorno (Exemplo: Voltar para a Página Inicial) */}
                    <div className="mt-6 text-center">
                        <Link href="/" className="font-medium text-gray-500 hover:text-blue-500 text-sm">
                            Voltar para a Página Inicial
                        </Link>
                    </div>
                </div>
                {/* --- FIM DO CONTEÚDO --- */}

            </div>
        </div>
    );
};

export default ContactUs;