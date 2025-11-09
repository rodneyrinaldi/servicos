// app/(main)/page.tsx
// Esta é a página Home (Rota principal da aplicação).

import React from 'react'; 

import Header from '@/components/Header';
import Footer from '../../components/Footer'; 

import HeroSection from '../../features/landing-page/components/HeroSection';
import ClientsSection from '../../features/landing-page/components/ClientsSection';
import BenefitsSection from '../../features/landing-page/components/BenefitsSection';
import TestimonialsSection from '../../features/landing-page/components/TestimonialsSection';
import MonetizationAndSurveySection from '../../features/landing-page/components/MonetizationAndSurveySection';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Header />
            <HeroSection /> 
            <ClientsSection />
            <BenefitsSection />
            <TestimonialsSection />
            <MonetizationAndSurveySection />
            <Footer />            
        </div>
    );
}