// components/Logo.tsx

import React from 'react';

// Define as propriedades que o componente Logo pode aceitar.
// Isso permite que você customize o tamanho e a cor a partir de outros componentes.
interface LogoProps {
  className?: string;
  iconClassName?: string;
}

/**
 * Componente que exibe o logotipo e o nome da marca 'Task Pilot'.
 * O logotipo é um ícone SVG simples para evitar dependências de arquivos de imagem.
 */
const Logo: React.FC<LogoProps> = ({ className = 'h-8', iconClassName = 'text-blue-600' }) => {
  return (
    // Contêiner principal, alinhando ícone e texto
    <div className={`flex items-center ${className}`}>
      
      {/* Ícone SVG: Representação visual do logotipo */}
      <svg
        className={`w-6 h-6 mr-1.5 ${iconClassName}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        {/* Ícone de um raio (símbolo de velocidade/ação) */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      
      {/* Texto da Marca */}
      <span className="text-xl font-bold text-gray-900">
        Serviços Advocatícios
      </span>
    </div>
  );
};

export default Logo;