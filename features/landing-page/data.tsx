// features/landing-page/data.ts
// Contém dados estáticos ESPECÍFICOS da Landing Page.

// Importação dos tipos
import { 
    EstadoUF, 
    Depoimento, 
    Beneficio, 
    ClientLogo // Importado o tipo necessário
} from '../../types'; 

// --- Constantes de Estilo Simples (Classes Tailwind) ---

// Objeto interno para organização das cores
const TAILWIND_COLORS = {
    BLUE: 'text-blue-600',
    ORANGE: 'text-orange-500',
    GREEN: 'text-green-500',
};

// CORRIGIDO: Re-exportando as constantes de cor faltantes
export const GOOGLE_BLUE = TAILWIND_COLORS.BLUE;
export const GOOGLE_ORANGE = TAILWIND_COLORS.ORANGE;
export const GOOGLE_GREEN = TAILWIND_COLORS.GREEN;

export const GOOGLE_SHADOW = 'shadow-md hover:shadow-lg'; 

// --- Dados Estáticos ---

// Lista completa dos 27 estados (mantida)
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

// ARRAY DE LOGOS para o Carrossel (Tipado com ClientLogo[])
export const CLIENT_LOGOS: ClientLogo[] = [
    { nome: "102ª Subseção Sto Amaro", file: "102subsecao.png" }, 
    { nome: "Adivocacia Rodney Rinaldi", file: "rodneyrinaldi.png" }, 
    { nome: "Advogado João Batista", file: "joaobatista.png" }, 
    { nome: "Advogado Renato Conilho", file: "renatoconilho.png" }, 
];

export const DEPOIMENTOS: Depoimento[] = [
    {
        nome: "Dr. Rodney Rinaldi",
        cargo: "Advogado Autônomo",
        texto: "O Task Pilot transformou a maneira como gerencio prazos. Essencial para a advocacia moderna!",
    },
    {
        nome: "Dr.João Batista",
        cargo: "Advogado Autônomo",
        texto: "A integração com o PJe é impecável. Nossa equipe economiza horas valiosas que antes eram gastas em cadastros manuais.",
    },
];

// Benefícios (agora sem JSX e tipados)
export const BENEFICIOS: Beneficio[] = [
    { 
        icone: 'CheckCircle', 
        cor: GOOGLE_BLUE, // Usando a constante re-exportada
        titulo: "Agendamento Automático",
        descricao: "Transforme comunicações judiciais em eventos no calendário com um clique, sem erros manuais.",
    },
    { 
        icone: 'Zap',
        cor: GOOGLE_ORANGE,
        titulo: "Redução de Riscos",
        descricao: "Minimize a chance de perder prazos cruciais ao automatizar a captura de dados diretamente do PJe.",
    },
    { 
        icone: 'Users',
        cor: GOOGLE_GREEN,
        titulo: "Foco no Cliente",
        descricao: "Libere o tempo da sua equipe para se concentrar em estratégia e atendimento, e não em tarefas repetitivas.",
    },
];