// components/Header.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    // 1. Estado para rastrear a rolagem
    const [scrolled, setScrolled] = useState(false);

    // 2. useEffect para adicionar/remover o listener de rolagem
    useEffect(() => {
        const handleScroll = () => {
            // Verifica se a posição de rolagem vertical é maior que 10
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // Limpeza do listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]); 

    // 3. Classes Dinâmicas Ajustadas

    // Estado Inicial: Fundo BRANCO BEM Transparente (30% de opacidade), Sem Sombra, Sem Borda
    const headerBackgroundInitial = 'bg-white/30 backdrop-blur-none border-b border-transparent shadow-none';

    // Estado Rolado: Fundo BRANCO QUASE Opaco (95% de opacidade), COM Sombra e Borda (Fica "mais escuro" por ser mais sólido)
    const headerBackgroundScrolled = 'bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200';
    
    // Classes de Texto e Ícone: Mantidas como `text-gray-800` (escuro) em ambos os estados, pois o fundo é sempre claro.
    const textAndIconColor = 'text-gray-800'; // Não precisa de lógica condicional se o fundo é sempre claro.


    return (
        <header
            className={`
                sticky top-0 z-50 transition-all duration-300 ease-in-out
                ${scrolled ? headerBackgroundScrolled : headerBackgroundInitial}
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Logo / Marca e Título */}
                <div className="shrink-0 flex items-center">
                    <Link href="/" aria-label="Home" className="flex items-center space-x-2">
                        
                        {/* 💡 1. SVG Caricato do Celular */}
                        <svg 
                            width="24" height="24" viewBox="0 0 24 24" fill="none" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className={textAndIconColor} // Aplica a cor padrão escuro
                        >
                            {/* Corpo do Celular */}
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                            
                            {/* Tela do Celular (fill mantido) */}
                            <rect x="7" y="4" width="10" height="14" rx="1" ry="1" fill="#ADD8E6" stroke="none" />
                            
                            {/* Botão Inferior (Home Button) */}
                            <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" className={textAndIconColor} />

                            {/* Braço Esquerdo */}
                            <line x1="4" y1="10" x2="1" y2="7" />
                            <line x1="1" y1="7" x2="3" y2="5" /> 

                            {/* Braço Direito */}
                            <line x1="20" y1="10" x2="23" y2="7" />
                            <line x1="23" y1="7" x2="21" y2="5" /> 

                            {/* Olhos (Fill branco é mantido, stroke muda) */}
                            <ellipse cx="8" cy="6.5" rx="3.5" ry="1.8" fill="white" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="8.5" cy="6.5" r="0.8" fill="black" /> 

                            <ellipse cx="16" cy="6.5" rx="3.5" ry="1.8" fill="white" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="15.5" cy="6.5" r="0.8" fill="black" /> 
                        </svg>
                        
                        {/* 💡 2. Título (A cor do texto é padrão escuro) */}
                        <h1 className={`text-xl font-bold hidden sm:block ${textAndIconColor}`}>
                            TaskPilot
                        </h1>
                    </Link>
                </div>
                
                {/* Botões de Ação (Login e Cadastro) */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    
                    {/* Botão de Login (Secundário - AGORA SEMPRE FUNDO BRANCO E TEXTO/BORDA AZUL) */}
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

                    {/* Botão de Cadastro (Primário - Mantido) */}
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