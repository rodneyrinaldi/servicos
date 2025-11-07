// app/(main)/page.tsx
// Esta é a página Home (Rota principal da aplicação).

import React from 'react'; 

// Importações dos Componentes de Layout Global
// Caminho corrigido: ../../components/ (sai de (main), sai de app, entra em components)
import Header from '@/components/Header';
import Footer from '../../components/Footer'; 

// Importações dos Componentes da Feature 'Landing Page'
// Caminho corrigido: ../../features/landing-page/...
import HeroSection from '../../features/landing-page/components/HeroSection';
import ClientsSection from '../../features/landing-page/components/ClientsSection';
import BenefitsSection from '../../features/landing-page/components/BenefitsSection';
import TestimonialsSection from '../../features/landing-page/components/TestimonialsSection';
import MonetizationAndSurveySection from '../../features/landing-page/components/MonetizationAndSurveySection';


/**
 * Componente principal da página inicial.
 * Ele monta o layout, utilizando as seções importadas de suas respectivas features/pastas.
 */
export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            
            {/* Seções de conteúdo da Feature Landing Page */}
            <Header />
            <HeroSection /> 
            <ClientsSection />
            <BenefitsSection />
            <TestimonialsSection />
            <MonetizationAndSurveySection />

            {/* Componente de Layout Global */}
            <Footer />
            
        </div>
    );
}