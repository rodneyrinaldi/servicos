// features/landing-page/components/MonetizationAndSurveySection.tsx
import React from 'react';
import { MessageSquare } from 'lucide-react';
// Importação ajustada para o arquivo de dados na pasta Feature pai
import { GOOGLE_SHADOW, GOOGLE_BLUE } from '../data'; 

const MonetizationAndSurveySection: React.FC = () => (
    <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. Área de Propaganda (Monetização) */}
            <div className={`bg-gray-50 p-8 rounded-xl ${GOOGLE_SHADOW} border border-gray-200 text-center`}>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Impulsione seu Negócio
                </h3>
                <p className="text-gray-600 mb-6">
                    Espaço reservado para parcerias e ferramentas.
                </p>
                <div className="h-32 bg-yellow-50 border-2 border-yellow-300 border-dashed flex items-center justify-center text-yellow-700 font-medium rounded-lg">
                    [Banner de Parceiro]
                </div>
            </div>

            {/* 2. Área de Enquetes e Sugestões */}
            <div className={`bg-gray-50 p-8 rounded-xl ${GOOGLE_SHADOW} border border-gray-200`}>
                <h3 className={`text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center md:justify-start ${GOOGLE_BLUE}`}>
                    <MessageSquare className={`w-6 h-6 mr-2 ${GOOGLE_BLUE}`} />
                    Opinião e Sugestões
                </h3>
                <p className="text-gray-600 mb-4">
                    Ajude-nos a evoluir. O que você gostaria de ver no Task Pilot?
                </p>
                <form className="space-y-3">
                    <textarea
                        rows={3}
                        placeholder="Deixe sua sugestão aqui..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200 shadow-lg shadow-blue-500/30"
                    >
                        Enviar Feedback
                    </button>
                </form>
            </div>
        </div>
    </section>
);

export default MonetizationAndSurveySection;