'use client'
import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
}

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const isFormValid = useMemo(() => {
    return name.trim().length > 0 && email.includes('@') && message.trim().length > 10;
  }, [name, email, message]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!isFormValid) {
      setError('Preencha todos os campos corretamente. A mensagem deve ter no mínimo 10 caracteres.');
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      let errorMessage = 'Erro inesperado ao enviar sua mensagem.';
      if (isErrorWithMessage(err)) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setError(errorMessage);
    }
  }, [isFormValid]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center sm:px-6 lg:px-8">
      {/* Logo e título */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="flex justify-center items-center text-3xl font-extrabold text-gray-900">
          <Image
            src="/images/logow.png"
            alt="Logo - Versão Completa"
            className="hidden sm:block transition-transform duration-300"
            width={225}
            height={60}
            priority
          />
          <Image
            src="/images/logom.png"
            alt="Logo - Versão Mobile"
            className="sm:hidden"
            width={80}
            height={80}
            priority
          />
        </Link>
      </div>

      {/* Formulário */}
      <div className="w-full max-w-sm">
        {success ? (
          <div className="p-6 bg-green-50 rounded-lg shadow-xl border border-green-200 text-center">
            <div className="mx-auto w-12 h-12 mb-3">
              <span className="text-4xl text-green-600">✅</span>
            </div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">Mensagem enviada!</h2>
            <p className="text-gray-700">Obrigado por entrar em contato. Retornaremos em breve.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Voltar para a página inicial
            </Link>
          </div>
        ) : (
          <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-100">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">Fale Conosco</h2>
              <p className="text-gray-500 text-sm">Envie sua dúvida, sugestão ou comentário</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                            ${!isFormValid 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`
                            }
              >
                Enviar Mensagem
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-700">
              <p>
                Precisa de ajuda imediata?{' '}
                <Link href="/faq" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Acesse nossa FAQ
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Rodapé de ajuda */}
      <div className="mt-6 text-sm text-center text-gray-500">
        <p> <Link href="https://tecnologia.rodneyrinaldi.com.br" className="text-blue-600 hover:underline">tecnologia.rodneyrinaldi.com.br</Link></p>
      </div>
    </div>
  );
};

export default ContactPage;
