// app/(auth)/layout.tsx

import React from 'react';
import Link from 'next/link';

// Metadados específicos para páginas de autenticação (opcional)
export const metadata = {
  title: 'Autenticação | Serviços Advocatícios',
  description: 'Acesse ou crie sua conta para monitorar notificações PJe.',
};

/**
 * Layout específico para o grupo de rotas de autenticação (/login, /signup, /recuperar-senha).
 * O objetivo é centralizar o conteúdo (formulários) e manter o layout minimalista.
 */
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // Corpo principal: Altura total da tela e fundo neutro
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      
      {/* Container Centralizado */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Logo e Nome da Aplicação */}
        <div className="text-center mb-6">
            <Link href="/" className="flex justify-center items-center text-3xl font-extrabold text-gray-900">
                {/* 🚨 Substitua pela importação real do seu Logo se quiser usá-lo */}
                <span className="text-blue-600">Serviços Advocatícios</span>
            </Link>
            <h2 className="mt-4 text-xl font-medium text-gray-600">
                Acesse sua área de usuário
            </h2>
        </div>
        
        {/* Slot para o Conteúdo da Página (LoginForm ou RegisterForm) */}
        {children}
      </div>

      {/* Rodapé de Acessibilidade/Ajuda */}
      <div className="mt-8 text-sm text-center text-gray-500">
        <p>Precisa de ajuda? <Link href="/contactus" className="text-blue-600 hover:underline">Fale Conosco</Link></p>
      </div>

    </div>
  );
};

export default AuthLayout;