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
    <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
            
            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Agendamento de Prazos <span className={GOOGLE_BLUE}>Inteligente</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Sincronize automaticamente as comunicações judiciais do PJe diretamente com seu calendário.
            </p>

            {/* Imagem Comercial da Aplicação */}
            <div className="mt-12 mb-12 flex justify-center">
                <Image
                    src="/images/app-screenshot.png"
                    alt="Interface da aplicação Task Pilot"
                    width={700}
                    height={450}
                    priority={true}
                    className="rounded-lg shadow-xl border border-gray-100"
                />
            </div>
            
            {/* Logo do Task Pilot */}
            <TaskPilotLogo className="mx-auto mb-8 w-60 h-16" />

            {/* Formulário de Busca */}
            <div className="mt-12">
                {/* O HeroSection passa a ser o único local que renderiza TaskSearchForm na Landing Page */}
                <TaskSearchForm />
            </div>
            
            {/* Instruções de integração */}
            {/* <div className="mt-6 text-center">
                <a 
                    // O caminho aponta para o arquivo na pasta 'public'
                    href="/readembed.pdf"
                    // O atributo 'download' força o navegador a baixar o arquivo em vez de navegá-lo
                    download="Guia-de-Integracao-Task-Pilot.pdf" 
                    // Estilo simples e discreto
                    className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
                    // Acessibilidade (caso o linter reclame de links sem descrição)
                    aria-label="Baixar guia de integração do widget Task Pilot"
                >
                    Baixar Guia de Integração para Desenvolvedores (PDF)
                </a>
            </div> */}
            {/* Link para Visualização do Guia de Integração */}
            <div className="mt-6 text-center">
                <a
                    // O caminho aponta para o arquivo na pasta 'public'
                    href="/pjenotifications-embed.html"
                    // Estilo simples e discreto
                    className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
                    // Acessibilidade (caso o linter reclame de links sem descrição)
                    aria-label="Visualizar guia de integração do widget Task Pilot"
                >
                    Guia de Integração para Desenvolvedores
                </a>
            </div>

        </div>
    </section>
);

export default HeroSection;