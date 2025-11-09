export type ProcessoResumo = { 
    /** Data da movimentação no formato YYYY-MM-DD */
    data: string; 
    /** Descrição da movimentação ou comunicação */
    descricao: string; 
    /** Número do processo (pode ser com ou sem máscara) */
    numero: string; 
};

/** Estrutura de dados recebida diretamente da API do PJe (exemplo) */
export type ComunicacaoItem = {
    data_disponibilizacao: string;
    tipoComunicacao: string;
    nomeOrgao: string;
    texto: string;
    numero_processo: string;
    numeroprocessocommascara: string;
};

// --- Tipagens de Dados Estáticos (Usadas pela Landing Page) ---

export type EstadoUF = {
    uf: string;
    nome: string;
};

export type Cliente = {
    nome: string;
    logo: string;
};

export type Depoimento = {
    nome: string;
    cargo: string;
    texto: string;
};

export interface Beneficio {
    icone: string;
    cor: string;
    titulo: string;
    descricao: string;
}

export interface ClientLogo {
    nome: string;
    file: string; // O nome do arquivo (ex: 'souza-adv.png')
}

// --- Outros Tipos Globais ---

// (Se a SearchState fosse global, ela estaria aqui, mas foi movida para features/search-widget/types.ts)
// (Se houvesse um tipo global de Usuário ou Configuração, ele iria aqui)