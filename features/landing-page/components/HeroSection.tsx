// features/landing-page/components/HeroSection.tsx
import React from 'react';
import Image from 'next/image';

// 1. Importação da Logo (Componente Global)
// Caminho ajustado: Sai de features/landing-page/components (../..), e entra em /components/
import TaskPilotLogo from '../../../components/TaskPilotLogo'; 

// 2. Importação do Formulário de Busca (Componente de Outra Feature)
// Caminho ajustado: Sai de features/landing-page/components (../..), e entra em /features/search-widget/components/
import TaskSearchForm from '../../pjenotifications-widget/components/TaskSearchForm';

// 3. Importação das Constantes de Estilo (Dados da Própria Feature)
// Caminho ajustado: Agora está no arquivo de dados da feature pai (../data.tsx)
import { GOOGLE_BLUE } from '../data'; 

const HeroSection: React.FC = () => (
    <>
        <section className="py-6 md:py-12 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">  
                {/* Título Principal */}
                <h1 className="text-lg sm:text-5xl font-extrabold text-gray-900 leading-tight">
                    Serviços <span className={GOOGLE_BLUE}>Advocatícios</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    Sincronizações, comunicações judiciais, diversos serviços de automação.
                </p>

                {/* Imagem Comercial da Aplicação */}
                <div className="mt-12 mb-12 flex justify-center">
                    <Image
                        src="/images/imagem.png"
                        alt="Interface da aplicação Task Pilot"
                        width={350}
                        height={225}
                        priority={true}
                        className="bg-white"
                    />
                </div>
            </div>
        </section>

        <section className="py-8 md:py-24 bg-gray-50 border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 text-center">                
                
                {/* Logo do Task Pilot */}
                <TaskPilotLogo className="mx-auto mb-2 w-60 h-16" />

                {/* Formulário de Busca */}
                <div className="mt-2">
                    {/* O HeroSection passa a ser o único local que renderiza TaskSearchForm na Landing Page */}
                    <TaskSearchForm />
                </div>
                
                {/* Instruções de integração */}
                <div className="mt-2 text-center">
                    <a
                        // O caminho aponta para o arquivo na pasta 'public'
                        href="/pjenotifications-embed.html"
                        // Estilo simples e discreto
                        className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
                        // Acessibilidade (caso o linter reclame de links sem descrição)
                        aria-label="Visualizar guia de integração do widget Task Pilot"
                    >
                        Guia de Integração
                    </a>
                    <span className="mx-2 text-gray-400"> | </span>
                    <a
                        // O caminho aponta para o arquivo na pasta 'public'
                        href="https://taskpilot.rrs.net.br"
                        // Estilo simples e discreto
                        className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
                        // Acessibilidade (caso o linter reclame de links sem descrição)
                        aria-label="Visualizar guia de integração do widget Task Pilot"
                    >
                        Visualizar Integração
                    </a>
                </div>

            </div>
        </section>
    </>
);

export default HeroSection;