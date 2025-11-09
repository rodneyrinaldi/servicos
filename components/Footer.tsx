// components/Footer.tsx

import React from 'react';
import Link from 'next/link'; 
import Logo from './Logo'; 

// Importação da constante GOOGLE_BLUE, que está dois níveis acima, e dentro da feature/landing-page/data.tsx
import { GOOGLE_BLUE } from '../features/landing-page/data'; 

const Footer: React.FC = () => (
    <footer className="bg-gray-100 text-gray-700 py-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            <Logo className="mx-auto w-32 h-8" />
            <p className="mt-4 text-gray-500">
                &copy; {new Date().getFullYear()} servicos.adv.br - Todos os direitos reservados.
            </p>
            <div className="mt-3 space-x-4">
                <Link 
                    href="/termsofservice" 
                    className={`text-gray-600 hover:${GOOGLE_BLUE} transition`}
                >
                    Termos de Uso
                </Link>
                <span className="text-gray-400">|</span>
                <Link 
                    href="/privacypolicy" 
                    className={`text-gray-600 hover:${GOOGLE_BLUE} transition`}
                >
                    Política de Privacidade
                </Link>
            </div>
            <p className="mt-3 text-xs text-gray-500">
                servicos.adv.br é uma plataforma com ferramentas de automação para o operador do direito.
            </p>
        </div>
    </footer>
);

export default Footer;