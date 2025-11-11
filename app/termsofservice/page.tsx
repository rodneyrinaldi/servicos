import React from 'react';

// Função auxiliar (Componente Section) para renderizar seções com estilo consistente.
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    // Reduzi a margem inferior (mb-6) para otimizar o espaço vertical em telas pequenas.
    <section className="mb-6 text-gray-700">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 mt-6 pb-2 border-b-2 border-indigo-100">
            {title}
        </h2>
        {children}
    </section>
);

const TermsOfService: React.FC = () => {
    
    // Configurações internas
    const lastUpdated: string = "10 Novembro 2025";
    const contactEmail: string = "contato@rodneyrinaldi.com.br";
    const organizationName: string = "Rodney Rinaldi Tecnologia";
    const productName: string = "Task Pilot";

    return (
        // Container principal: Padding maior em telas pequenas (p-6) e aumenta em sm:p-10
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-inter">
            {/* Cartão de conteúdo: Padding ajustado (p-5 sm:p-8) e largura máxima ajustada para 3xl em mobile */}
            <div className="max-w-3xl lg:max-w-4xl mx-auto bg-white p-5 sm:p-8 rounded-xl shadow-lg ring-1 ring-gray-100">
                
                {/* Cabeçalho Principal */}
                <header className="mb-8 border-b border-gray-200 pb-4">
                    {/* Título: Menor em telas pequenas (text-3xl) e maior em sm:text-4xl */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
                        Termos de Uso
                    </h1> 
                    <p className="mt-2 text-sm text-gray-500">
                        Última atualização: <span className="font-medium">{lastUpdated}</span>
                    </p>
                </header>

                {/* Bloco introdutório: Fonte ligeiramente menor em mobile (text-base sm:text-lg) */}
                <p className="mb-6 text-base sm:text-lg text-gray-600 border-l-4 border-indigo-400 pl-4 py-1 italic">
                    Ao acessar ou usar a plataforma <span className="font-bold text-gray-800">{productName}</span>, você concorda em cumprir integralmente os termos e condições descritos abaixo.
                </p>

                {/* 1. Aceitação dos Termos */}
                <Section title="1. Aceitação dos Termos">
                    <p>
                        Ao acessar ou usar a plataforma <span className="font-semibold text-gray-900">{productName}</span> e seus serviços (incluindo o widget de busca de notificações PJe), você concorda com estes Termos de Uso, com a nossa <a href="/politica-de-privacidade" className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition duration-150 ease-in-out">Política de Privacidade</a> e todas as leis e regulamentos aplicáveis. Se você não concordar com estes Termos, não utilize o serviço.
                    </p>
                </Section>

                {/* 2. Objeto do Serviço */}
                <Section title="2. Objeto do Serviço">
                    <p>
                        O {productName} é uma plataforma de <span className="font-bold">monitoramento e consulta de comunicações processuais eletrônicas (PJe)</span>, destinada a advogados, escritórios de advocacia e profissionais do direito. Nosso serviço consiste em fornecer um mecanismo rápido para consultar a situação de notificações e prazos mediante o fornecimento de dados de identificação do advogado (OAB/UF).
                    </p>
                </Section>

                {/* 3. Licença de Uso */}
                <Section title="3. Licença de Uso">
                    <p>
                        Concedemos a você uma licença limitada, não exclusiva, intransferível e revogável para usar o {productName} exclusivamente para fins profissionais e em conformidade com estes Termos. A plataforma <span className="font-semibold italic">não é vendida, mas sim licenciada</span> para uso.
                    </p>
                </Section>

                {/* 4. Propriedade Intelectual */}
                <Section title="4. Propriedade Intelectual">
                    <p>
                        Todo o conteúdo, software, algoritmos, design e marcas do {productName} são propriedade exclusiva da <span className="font-semibold">{organizationName}</span> e protegidos por leis de direitos autorais e propriedade industrial. É estritamente proibida a reprodução, engenharia reversa, distribuição ou uso comercial não autorizado de qualquer parte do software.
                    </p>
                </Section>
                
                {/* 5. Responsabilidades do Usuário */}
                <Section title="5. Responsabilidades do Usuário">
                    <p>
                        Você concorda em:
                    </p>
                    {/* Ajuste na margem esquerda (ml-4 sm:ml-6) para evitar corte em telas estreitas */}
                    <ul className="list-disc list-outside ml-4 sm:ml-6 mt-3 space-y-3">
                        <li>Fornecer informações de registro precisas e manter sua senha segura.</li>
                        <li>Não utilizar o serviço para fins ilícitos, incluindo o acesso não autorizado a informações judiciais de terceiros.</li>
                        <li>Reconhecer que os dados fornecidos pelo widget são informativos e <span className="font-medium">não substituem a intimação oficial</span> ou a conferência nos autos eletrônicos.</li>
                    </ul>
                </Section>

                {/* 6. Limitação de Responsabilidade */}
                <Section title="6. Limitação de Responsabilidade">
                    <p>
                        O {productName} é fornecido como está e não garante a precisão, integridade ou pontualidade de todas as informações provenientes de fontes externas (PJe, Diários, etc.). Em nenhuma circunstância a {organizationName} será responsável por quaisquer danos diretos, indiretos ou perda de prazos processuais decorrentes do uso (ou incapacidade de uso) do serviço. O usuário é o único responsável pela conferência e cumprimento dos prazos.
                    </p>
                </Section>

                {/* Contato (Rodapé) */}
                <footer className="pt-6 mt-8 border-t border-gray-200 text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Dúvidas e Contato</h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Para quaisquer dúvidas ou esclarecimentos adicionais sobre estes Termos de Uso, por favor, entre em contato conosco através do email:
                    </p>
                    <p className="mt-4 text-lg font-bold text-indigo-600">
                        <a href={`mailto:${contactEmail}`} className="hover:underline transition duration-150 ease-in-out">
                            {contactEmail}
                        </a>
                    </p>
                </footer>

            </div>
        </div>
    );
};

export default TermsOfService;