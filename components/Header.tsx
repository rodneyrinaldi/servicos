// components/Header.tsx

import React from 'react';
import Link from 'next/link';
// Assumindo que você usa o Logo (anteriormente TaskPilotLogo)
import Logo from './Logo'; 

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Logo / Marca */}
                <div className="shrink-0">
                    <Link href="/" aria-label="Home">
                        {/* Use o componente Logo com o tamanho adequado */}
                        <Logo className="h-8 w-auto" /> 
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