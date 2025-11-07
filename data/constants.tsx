// features/landing-page/data.tsx 
// Contém constantes de estilo e dados estáticos ESPECÍFICOS da Landing Page.

import React from 'react'; // <-- ESSENCIAL, pois o arquivo contém JSX (ícones)
import { CheckCircle, Zap, Users } from 'lucide-react';

// Tipos importados da pasta raiz 'types/'
// Ajuste o caminho relativo conforme necessário (neste exemplo, estamos 2 níveis acima)
import { EstadoUF, Cliente, Depoimento, Beneficio } from '../types/index'; 

// Cores primárias no estilo Google (Mantidas aqui por serem amplamente usadas nas features)
export const GOOGLE_BLUE = 'text-blue-600'; 
export const GOOGLE_SHADOW = 'shadow-md hover:shadow-lg'; 
export const API_BASE_URL = "https://comunicaapi.pje.jus.br/api/v1/comunicacao"; // Pode ser movido para lib/constants

// --- Dados Estáticos (Clientes, Depoimentos, etc.) ---

export const ESTADOS_BRASIL: EstadoUF[] = [
    // ... (Lista completa dos estados) ...
    { uf: 'AC', nome: 'Acre' }, { uf: 'AM', nome: 'Amazonas' }, 
    { uf: 'SP', nome: 'São Paulo' }, { uf: 'RJ', nome: 'Rio de Janeiro' },
    // ...
];

export const CLIENTES: Cliente[] = [
    // ... (Lista de clientes) ...
    { nome: "Advocacia Souza", logo: "https://placehold.co/120x60/4285F4/ffffff?text=Souza+Adv" },
    // ...
];

export const DEPOIMENTOS: Depoimento[] = [
    // ... (Lista de depoimentos) ...
    {
        nome: "Dr. Ana Costa",
        cargo: "Advogada Autônoma",
        texto: "O Task Pilot transformou a maneira como gerencio prazos. Essencial para a advocacia moderna!",
    },
];

export const BENEFICIOS: Beneficio[] = [
    { 
        icone: <CheckCircle className={`w-6 h-6 ${GOOGLE_BLUE}`} />,
        titulo: "Agendamento Automático",
        descricao: "Transforme comunicações judiciais em eventos no calendário com um clique, sem erros manuais.",
    },
    { 
        icone: <Zap className="w-6 h-6 text-orange-500" />,
        titulo: "Redução de Riscos",
        descricao: "Minimize a chance de perder prazos cruciais ao automatizar a captura de dados diretamente do PJe.",
    },
    { 
        icone: <Users className="w-6 h-6 text-green-500" />,
        titulo: "Foco no Cliente",
        descricao: "Libere o tempo da sua equipe para se concentrar em estratégia e atendimento, e não em tarefas repetitivas.",
    },
];