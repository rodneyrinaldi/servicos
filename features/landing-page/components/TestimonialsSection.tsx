// features/landing-page/components/TestimonialsSection.tsx
import React from 'react';
import { Star } from 'lucide-react';
// Importação ajustada para o arquivo de dados na pasta Feature pai
import { GOOGLE_SHADOW, DEPOIMENTOS } from '../data'; 

const TestimonialsSection: React.FC = () => (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                O que dizem nossos usuários
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {DEPOIMENTOS.map((d, index) => (
                    <div 
                        key={index} 
                        className={`p-8 bg-white rounded-xl ${GOOGLE_SHADOW} border border-gray-100`}
                    >
                        {/* A estrela é importada do lucide-react diretamente neste componente */}
                        <Star className={`w-5 h-5 text-yellow-500 fill-yellow-500 mb-4`} />
                        <p className="text-gray-700 italic mb-4">{d.texto}</p>
                        <div className="font-semibold text-gray-800">
                            {d.nome}
                            <p className="text-sm font-normal text-gray-600">{d.cargo}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default TestimonialsSection;