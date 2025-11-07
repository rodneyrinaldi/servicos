// components/Footer.tsx

import React from 'react';
import TaskPilotLogo from './TaskPilotLogo'; // Importação continua relativa, pois Logo está na mesma pasta (/components/)

// Importação da constante GOOGLE_BLUE, que está dois níveis acima, e dentro da feature/landing-page/data.tsx
import { GOOGLE_BLUE } from '../features/landing-page/data'; 

const Footer: React.FC = () => (
    <footer className="bg-gray-100 text-gray-700 py-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            <TaskPilotLogo className="mx-auto w-32 h-8" />
            <p className="mt-4 text-gray-500">
                &copy; {new Date().getFullYear()} Task Pilot. Todos os direitos reservados.
            </p>
            <div className="mt-3 space-x-4">
                <a href="#" className={`hover:${GOOGLE_BLUE} transition`}>Termos de Uso</a>
                <span className="text-gray-400">|</span>
                <a href="#" className={`hover:${GOOGLE_BLUE} transition`}>Política de Privacidade</a>
            </div>
            <p className="mt-3 text-xs text-gray-500">
                *O Task Pilot é uma ferramenta de terceiros e não possui vínculo oficial com o PJe.
            </p>
        </div>
    </footer>
);

export default Footer;