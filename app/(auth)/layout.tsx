// app/(auth)/layout.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

// Metadados específicos para páginas de autenticação (opcional)
export const metadata = {
  title: 'Autenticação | Serviços Advocatícios',
  description: 'Acesse ou crie sua conta para monitorar notificações PJe.',
};

const logoScaleClass = `transition-transform duration-300`;

/**
 * Layout específico para o grupo de rotas de autenticação (/login, /signup, /recuperar-senha).
 * O objetivo é centralizar o conteúdo (formulários) e manter o layout minimalista.
 */
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // Corpo principal: Altura total da tela e fundo neutro
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center sm:px-6 lg:px-8">
      
      {/* Container Centralizado */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Logo e Nome da Aplicação */}
        <div className="text-center">
            <Link href="/" className="flex justify-center items-center text-3xl font-extrabold text-gray-900">
              <Image
                  src="/images/logow.png" 
                  alt="Logo - Versão Completa"
                  className={`hidden sm:block ${logoScaleClass}`} 
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
        
        {/* Slot para o Conteúdo da Página (LoginForm ou RegisterForm) */}
        {children}
      </div>

      {/* Rodapé de Acessibilidade/Ajuda */}
      <div className="mt-6 text-sm text-center text-gray-500">
        <p>Precisa de ajuda? <Link href="/contactus" className="text-blue-600 hover:underline">Fale Conosco</Link></p>
      </div>

    </div>
  );
};

export default AuthLayout;