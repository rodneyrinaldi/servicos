// features/landing-page/components/BenefitsSection.tsx
import React from 'react';
import { GOOGLE_SHADOW, BENEFICIOS } from '../data'; // Caminho ajustado: agora '../data.tsx'
// Nota: A importação de 'Lucide' (por exemplo, CheckCircle) não é necessária aqui,
// pois o componente 'data.tsx' já exporta os ícones como React.ReactNode dentro do array BENEFICIOS.

const BenefitsSection: React.FC = () => (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Vantagens do Task Pilot
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BENEFICIOS.map((b, index) => (
                    <div 
                        key={index} 
                        className={`flex flex-col items-center text-center p-8 bg-white rounded-xl ${GOOGLE_SHADOW} border border-gray-100 transition duration-300`}
                    >
                        {/* Renderiza o ícone JSX que foi definido em data.tsx */}
                        <div className={`mb-4 p-3 rounded-full bg-blue-50/50`}>{b.icone}</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{b.titulo}</h3>
                        <p className="text-gray-600">{b.descricao}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default BenefitsSection;