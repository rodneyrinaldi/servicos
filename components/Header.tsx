// components/Header.tsx

import React from 'react';
import Link from 'next/link';

// NOTA: A importação do Logo foi removida.

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Logo (SVG Caricato) / Marca e Título */}
                <div className="shrink-0 flex items-center">
                    {/* O Link envolve o Logo (SVG) e o Título */}
                    <Link href="/" aria-label="Home" className="flex items-center space-x-2">
                        
                        {/* 💡 1. SVG Caricato do Celular (Ajustado para 24x24) */}
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  {/* Corpo do Celular */}
  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
  
  {/* Tela do Celular (um pouco menor que o corpo) */}
  <rect x="7" y="4" width="10" height="14" rx="1" ry="1" fill="#ADD8E6" stroke="none" />
  
  {/* Botão Inferior (Home Button) */}
  <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />

  {/* Braço Esquerdo */}
  <line x1="4" y1="10" x2="1" y2="7" />
  <line x1="1" y1="7" x2="3" y2="5" /> {/* Mão esquerda */}
  
  {/* Braço Direito */}
  <line x1="20" y1="10" x2="23" y2="7" />
  <line x1="23" y1="7" x2="21" y2="5" /> {/* Mão direita */}

  {/* Olho Esquerdo (Sobreposto e Achatado) */}
  {/* rx é maior que ry para achatar. cx ajustado para transpassar a lateral. cy mais baixo. */}
  <ellipse cx="8" cy="6.5" rx="3.5" ry="1.8" fill="white" stroke="currentColor" strokeWidth="1.5" />
  <circle cx="8.5" cy="6.5" r="0.8" fill="black" /> {/* Pupila esquerda */}

  {/* Olho Direito (Sobreposto e Achatado) */}
  {/* rx é maior que ry para achatar. cx ajustado para transpassar a lateral. cy mais baixo. */}
  <ellipse cx="16" cy="6.5" rx="3.5" ry="1.8" fill="white" stroke="currentColor" strokeWidth="1.5" />
  <circle cx="15.5" cy="6.5" r="0.8" fill="black" /> {/* Pupila direita */}
</svg>
                        
                        {/* 💡 2. Título (Oculto em Mobile, Visível a partir de 'sm') */}
                        <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
                            TaskPilot
                        </h1>
                    </Link>
                </div>
                
                {/* Botões de Ação (Login e Cadastro) */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    
                    {/* Botão de Login (Secundário - Estilo Contorno) */}
                    <Link href="/login">
                        <button
                            className="text-blue-600 border border-blue-600 hover:bg-blue-50 transition duration-150 ease-in-out 
                                        font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Entrar
                        </button>
                    </Link>

                    {/* Botão de Cadastro (Primário - Estilo Sólido - CTA Principal) */}
                    <Link href="/signup">
                        <button
                            className="bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out 
                                        font-semibold rounded-lg text-sm px-4 py-2 shadow-md hover:shadow-lg"
                        >
                            Criar Conta Grátis
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;