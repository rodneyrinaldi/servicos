'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Como posso recuperar minha senha?',
    answer: 'Acesse a página de recuperação de senha e siga as instruções para redefinir sua senha com segurança.'
  },
  {
    question: 'Como faço para acompanhar notificações do PJe?',
    answer: 'Após o login, você verá um painel com suas notificações. Certifique-se de que seu cadastro esteja completo.'
  },
  {
    question: 'Posso cadastrar mais de um advogado por conta?',
    answer: 'Sim, você pode adicionar múltiplos perfis vinculados ao mesmo escritório, desde que cada um tenha um email único.'
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Sim. Utilizamos criptografia e práticas de segurança modernas para proteger suas informações pessoais.'
  }
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center sm:px-6 lg:px-8 overflow-hidden">
      {/* Logo */}
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

      {/* Card FAQ */}
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl border border-gray-100 box-border">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Perguntas Frequentes</h2>
          <p className="text-gray-500 text-sm">Encontre respostas para dúvidas comuns</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-md overflow-hidden box-border">
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 focus:outline-none box-border"
              >
                <span className="font-medium text-gray-700 wrap-break-word">{faq.question}</span>
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 text-sm text-gray-600 bg-white border-t border-gray-200 box-border wrap-break-word">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-700">
          <p>
            Ainda tem dúvidas?{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Fale Conosco
            </Link>
          </p>
        </div>
      </div>

      {/* Rodapé */}
      <div className="mt-6 text-sm text-center text-gray-500">
        <p>Voltar para <Link href="/" className="text-blue-600 hover:underline">Página Inicial</Link></p>
      </div>
    </div>
  );
};

export default FAQPage;
