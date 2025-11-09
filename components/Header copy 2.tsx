// components/Header.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

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

    // 2. Classes de Estilo (textAndIconColor REMOVIDA)
    const headerBackgroundInitial = 'bg-white/30 backdrop-blur-none border-b border-transparent shadow-none';
    const headerBackgroundScrolled = 'bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200';
    // REMOVIDA: const textAndIconColor = 'text-gray-800'; 

    // 3. CLASSE DE ALTURA DINÂMICA (Mantida)
    let headerHeightClass = 'h-16'; 
    if (!scrolled) {
        headerHeightClass += ' md:h-32';
    }

    return (
        <header
            className={`
                sticky top-0 z-50 transition-all duration-300 ease-in-out
                ${headerHeightClass} 
                ${scrolled ? headerBackgroundScrolled : headerBackgroundInitial}
            `}
        >
            <div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between"
            >
                
                <div className="shrink-0 flex items-center">
                    <Link href="/" aria-label="Home" className="flex items-center space-x-2">
                        
                        {/* LOGO PARA TELA GRANDE (DESKTOP) */}
                        <Image
                            src="/images/logow.png" 
                            alt="Logo - Versão Completa"
                            className="hidden sm:block" 
                            width={240} 
                            height={64}  
                            priority 
                        />
                        
                        {/* LOGO PARA TELA PEQUENA (MOBILE) */}
                        <Image
                            src="/images/logom.png" 
                            alt="Logo - Versão Mobile"
                            className="sm:hidden" 
                            width={40} 
                            height={40} 
                            priority 
                        />
                    </Link>
                </div>
                
                {/* Botões de Ação (Login e Cadastro) - Mantidos */}
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