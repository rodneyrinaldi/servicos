// components/Header.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    // 1. Lógica de Rolagem (Mantida)
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]); 

    // 2. Classes de Estilo (Mantidas)
    const headerBackgroundInitial = 'bg-white/30 backdrop-blur-none border-b border-transparent shadow-none';
    const headerBackgroundScrolled = 'bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200';
    const textAndIconColor = 'text-gray-800'; 

    // 3. CLASSE DE ALTURA DINÂMICA (CORRIGIDA)
    
    // Altura Base (Mobile First): SEMPRE 'h-16' (a menor altura)
    let headerHeightClass = 'h-16'; 

    // Se NÃO estiver rolado, aplicamos a altura maior (h-32), 
    // MAS APENAS PARA TELAS MAIORES QUE 'md:'.
    // Se estiver rolado, a classe 'h-16' (a menor) é mantida em todas as telas.
    if (!scrolled) {
        headerHeightClass += ' md:h-32';
    }


    return (
        <header
            className={`
                sticky top-0 z-50 transition-all duration-300 ease-in-out
                ${headerHeightClass} /* H-16 no mobile. H-32 no desktop SE NÃO estiver rolado. */
                ${scrolled ? headerBackgroundScrolled : headerBackgroundInitial}
            `}
        >
            <div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between"
            >
                
                {/* O restante do conteúdo permanece idêntico */}
                <div className="shrink-0 flex items-center">
                    <Link href="/" aria-label="Home" className="flex items-center space-x-2">
                        
                        {/* SVG Caricato do Celular (Mantido) */}
                        <svg 
                            width="24" height="24" viewBox="0 0 24 24" fill="none" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className={textAndIconColor}
                        >
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                            <rect x="7" y="4" width="10" height="14" rx="1" ry="1" fill="#ADD8E6" stroke="none" />
                            <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" className={textAndIconColor} />
                            <line x1="4" y1="10" x2="1" y2="7" />
                            <line x1="1" y1="7" x2="3" y2="5" /> 
                            <line x1="20" y1="10" x2="23" y2="7" />
                            <line x1="23" y1="7" x2="21" y2="5" /> 
                            <ellipse cx="8" cy="6.5" rx="3.5" ry="1.8" fill="white" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="8.5" cy="6.5" r="0.8" fill="black" /> 
                            <ellipse cx="16" cy="6.5" rx="3.5" ry="1.8" fill="white" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="15.5" cy="6.5" r="0.8" fill="black" /> 
                        </svg>
                        
                        {/* Título */}
                        <h1 className={`text-xl font-bold hidden sm:block ${textAndIconColor}`}>
                            TaskPilot
                        </h1>
                    </Link>
                </div>
                
                {/* Botões de Ação (Login e Cadastro) */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    
                    {/* Botão de Login (Mantido) */}
                    <Link href="/login">
                        <button
                            className={`
                                bg-white text-blue-600 border border-blue-600 
                                hover:bg-blue-50 transition duration-150 ease-in-out 
                                font-medium rounded-lg text-sm px-4 py-2
                            `}
                        >
                            Entrar
                        </button>
                    </Link>

                    {/* Botão de Cadastro (Mantido) */}
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