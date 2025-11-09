"use client"; 

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react'; 
import Autoplay from 'embla-carousel-autoplay'; 

import { ClientLogo } from '../../../types'; 
import { CLIENT_LOGOS } from '../data'; 

// --- Constantes de Estilo ---
const LOGO_CARD_STYLES = "p-3 bg-white transition duration-100 flex items-center justify-center";
const TITLE_STYLES = "text-xl font-semibold text-gray-500 mb-10 tracking-wider uppercase";

const ClientsSection: React.FC = () => {
    
    // 💡 Lógica Condicional: Menos de 4 slides = Conteúdo pequeno
    const isSmallContent = CLIENT_LOGOS.length < 4; 

    // Configurações do Embla Carousel
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        // 1. Alinhamento: Centraliza se for pequeno, senão alinha ao início.
        align: isSmallContent ? 'center' : 'start', 
        // 2. Loop: Desativa o loop se for pequeno (para permitir centralização).
        loop: !isSmallContent, 
        dragFree: true,
        slidesToScroll: isSmallContent ? 1 : 4, 
    }, [
        Autoplay({ 
            delay: 3000, 
            stopOnInteraction: false,
        })
    ]);

    const [slideOpacities, setSlideOpacities] = useState<number[]>([]);

    const applySlideStyles = useCallback((api: UseEmblaCarouselType[1] | undefined) => {
        if (!api) return;

        const scrollSnapList = api.scrollSnapList();
        
        const newOpacities = api.slideNodes().map((_, index) => {
            if (api.slidesInView().indexOf(index) !== -1 || scrollSnapList.includes(index)) {
                return 1;
            }
            return 0.5;
        });

        setSlideOpacities(newOpacities);
    }, []);

    useEffect(() => {
        if (emblaApi) {
            applySlideStyles(emblaApi); 
            emblaApi.on('select', applySlideStyles);
            emblaApi.on('scroll', applySlideStyles);
            emblaApi.on('reInit', applySlideStyles);
        }
        
        return () => {
            if (emblaApi) {
                emblaApi.off('select', applySlideStyles);
                emblaApi.off('scroll', applySlideStyles);
                emblaApi.off('reInit', applySlideStyles);
            }
        };
    }, [emblaApi, applySlideStyles]);


    return (
        <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className={TITLE_STYLES}>
                    Advogados e Escritórios que Confiam em Nós
                </h2>
            </div>
            
            <div className="relative"> 
                <div className="embla overflow-hidden px-6" ref={emblaRef}> 
                    <div className={`embla__container flex ${isSmallContent ? 'justify-center' : ''}`}>
                        {CLIENT_LOGOS.map((cliente: ClientLogo, index: number) => (
                            <div 
                                key={cliente.file} 
                                className="embla__slide relative p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 shrink-0 flex justify-center items-center"
                                style={{ opacity: slideOpacities[index] }}
                            >
                                <div className={LOGO_CARD_STYLES}>
                                    <Image
                                        src={`/images/clients/${cliente.file}`} 
                                        alt={`Logo do Cliente ${cliente.nome}`}
                                        fill={true} 
                                        // className="object-contain grayscale hover:grayscale-0 transition duration-75"
                                        className="object-contain transition duration-75"
                                        sizes="900px, 300px"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;