// features/landing-page/data.tsx 
// Contém constantes de estilo e dados estáticos ESPECÍFICOS da Landing Page.

import React from 'react'; 
import { CheckCircle, Zap, Users } from 'lucide-react';

// Tipos importados da pasta raiz 'types/'
import { EstadoUF, Cliente, Depoimento, Beneficio } from '../../types/index'; 

// Cores e Constantes Estáticas de Estilo
export const GOOGLE_BLUE = 'text-blue-600'; 
export const GOOGLE_SHADOW = 'shadow-md hover:shadow-lg'; 

// --- Dados Estáticos (Clientes, Depoimentos, etc.) ---

// Lista completa dos 27 estados (26 estados + DF).
// Ordem: SP fixo na primeira posição, seguido pelos demais em ordem alfabética por nome.
export const ESTADOS_BRASIL: EstadoUF[] = [
    // 1. Destaque: São Paulo
    { uf: 'SP', nome: 'São Paulo' }, 
    
    // 2. Ordem alfabética pelo nome (Acre até Tocantins)
    { uf: 'AC', nome: 'Acre' }, 
    { uf: 'AL', nome: 'Alagoas' },
    { uf: 'AP', nome: 'Amapá' },
    { uf: 'AM', nome: 'Amazonas' },
    { uf: 'BA', nome: 'Bahia' },
    { uf: 'CE', nome: 'Ceará' },
    { uf: 'DF', nome: 'Distrito Federal' },
    { uf: 'ES', nome: 'Espírito Santo' },
    { uf: 'GO', nome: 'Goiás' },
    { uf: 'MA', nome: 'Maranhão' },
    { uf: 'MT', nome: 'Mato Grosso' },
    { uf: 'MS', nome: 'Mato Grosso do Sul' },
    { uf: 'MG', nome: 'Minas Gerais' },
    { uf: 'PA', nome: 'Pará' },
    { uf: 'PB', nome: 'Paraíba' },
    { uf: 'PR', nome: 'Paraná' },
    { uf: 'PE', nome: 'Pernambuco' },
    { uf: 'PI', nome: 'Piauí' },
    { uf: 'RJ', nome: 'Rio de Janeiro' },
    { uf: 'RN', nome: 'Rio Grande do Norte' },
    { uf: 'RS', nome: 'Rio Grande do Sul' },
    { uf: 'RO', nome: 'Rondônia' },
    { uf: 'RR', nome: 'Roraima' },
    { uf: 'SC', nome: 'Santa Catarina' },
    { uf: 'SE', nome: 'Sergipe' },
    { uf: 'TO', nome: 'Tocantins' },
];

export const CLIENTES: Cliente[] = [
    { nome: "Advocacia Souza", logo: "https://placehold.co/120x60/4285F4/ffffff?text=Souza+Adv" }, 
    { nome: "Jurídico Lima", logo: "https://placehold.co/120x60/34A853/ffffff?text=Lima+Jur" }, 
    { nome: "Câmara & Costa", logo: "https://placehold.co/120x60/FBBC05/ffffff?text=Camara+%26+Co" }, 
    { nome: "Escritório Silva", logo: "https://placehold.co/120x60/EA4335/ffffff?text=Silva+ES" }, 
];

export const DEPOIMENTOS: Depoimento[] = [
    {
        nome: "Dr. Ana Costa",
        cargo: "Advogada Autônoma",
        texto: "O Task Pilot transformou a maneira como gerencio prazos. Essencial para a advocacia moderna!",
    },
    {
        nome: "Felipe Almeida",
        cargo: "Gestor de Equipe Jurídica",
        texto: "A integração com o PJe é impecável. Nossa equipe economiza horas valiosas que antes eram gastas em cadastros manuais.",
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