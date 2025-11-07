// features/landing-page/components/ClientsSection.tsx
import React from 'react';
import Image from 'next/image';
import { CLIENTES } from '../data'; // Caminho ajustado: agora '../data.tsx'

const ClientsSection: React.FC = () => (
    <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold text-gray-500 mb-8">
                Confiança de escritórios em todo o Brasil
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                {CLIENTES.map((c, index) => (
                    <div 
                        key={index} 
                        className="p-2 bg-white rounded-lg opacity-80 hover:opacity-100 transition duration-300 relative w-32 h-10"
                    >
                        <Image
                            src={c.logo}
                            alt={`Logo do Cliente ${c.nome}`}
                            width={120} 
                            height={60} 
                            className="h-10 object-contain" 
                            priority={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default ClientsSection;