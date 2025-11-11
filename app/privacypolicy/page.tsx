import React from 'react';

// Função auxiliar (Componente Section) para renderizar seções com estilo consistente.
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    // Reduzindo a margem inferior (mb-6) para otimizar espaço vertical em mobile.
    <section className="mb-6 text-gray-700">
        {/* Reduzindo o tamanho do título para 'xl' e o padding/margin para otimizar o mobile. */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 mt-6 pb-2 border-b-2 border-indigo-100">
            {title}
        </h2>
        {children}
    </section>
);

const PrivacyPolicy: React.FC = () => {
    
    // Configurações internas
    const lastUpdated: string = "10 Novembro 2025";
    const contactEmail: string = "contato@rodneyrinaldi.com.br";
    const organizationName: string = "Rodney Rinaldi Tecnologia";
    const productName: string = "Task Pilot";

    return (
        // Container principal: Aumentando o padding para 'p-6' em telas pequenas.
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-inter">
            {/* Cartão de conteúdo: Ajustando o padding interno (p-5 sm:p-8) e a largura máxima para mobile. */}
            <div className="max-w-3xl lg:max-w-4xl mx-auto bg-white p-5 sm:p-8 rounded-xl shadow-lg ring-1 ring-gray-100">
                
                {/* Cabeçalho Principal */}
                <header className="mb-8 border-b border-gray-200 pb-4">
                    {/* Título: Menor em telas pequenas (text-3xl) e maior em sm:text-4xl */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
                        Política de Privacidade
                    </h1> 
                    <p className="mt-2 text-sm text-gray-500">
                        Última atualização: <span className="font-medium">{lastUpdated}</span>
                    </p>
                </header>

                {/* Bloco introdutório: Fonte ligeiramente menor em mobile (text-base sm:text-lg) */}
                <p className="mb-6 text-base sm:text-lg text-gray-600 border-l-4 border-indigo-400 pl-4 py-1 italic">
                    Esta Política de Privacidade descreve como a <span className="font-bold text-gray-800">{organizationName}</span> coleta, usa e protege suas informações ao utilizar o serviço <span className="font-bold text-gray-800">{productName}</span>.
                </p>

                {/* 1. Introdução e Aceitação */}
                <Section title="1. Compromisso com a Privacidade">
                    <p>
                        A <span className="font-semibold">{organizationName}</span> tem o compromisso de proteger sua privacidade. Esta política descreve como coletamos, usamos, armazenamos e compartilhamos suas informações pessoais ao utilizar nossos serviços de monitoramento de prazos e comunicações PJe. Ao acessar e utilizar o {productName}, você concorda com os termos desta Política de Privacidade.
                    </p>
                </Section>

                {/* 2. Informações que Coletamos */}
                <Section title="2. Informações Coletadas e Finalidade">
                    <p>Coletamos as seguintes informações necessárias para a prestação dos serviços:</p>
                    
                    {/* Título da subseção: Menor em mobile (text-lg) e ajustando margens */}
                    <h3 className="text-lg sm:text-xl font-medium text-gray-700 mt-4 mb-2">2.1. Dados Fornecidos Diretamente por Você</h3>
                    {/* Ajuste na margem da lista (ml-4 sm:ml-6) */}
                    <ul className="list-disc list-outside ml-4 sm:ml-6 space-y-2">
                        <li><span className="font-semibold">Dados de Identificação e Contato:</span> Nome, e-mail e senha criptografada.</li>
                        <li><span className="font-semibold">Dados de Acesso a Serviços Judiciais:</span> Número da OAB e UF para realizar buscas e monitoramento de notificações (PJe).</li>
                    </ul>

                    {/* Título da subseção: Menor em mobile (text-lg) e ajustando margens */}
                    <h3 className="text-lg sm:text-xl font-medium text-gray-700 mt-4 mb-2">2.2. Dados de Uso</h3>
                    <p>
                        Coletamos dados técnicos sobre como você interage com o {productName}, como endereço IP, tipo de navegador, tempo gasto nas páginas e informações de dispositivo.
                    </p>
                </Section>
                
                {/* 3. Como Usamos Suas Informações */}
                <Section title="3. Finalidades do Uso de Dados">
                    <p>
                        Utilizamos suas informações pessoais e de acesso para:
                    </p>
                    {/* Ajuste na margem da lista (ml-4 sm:ml-6) */}
                    <ul className="list-disc list-outside ml-4 sm:ml-6 mt-3 space-y-3">
                        <li><span className="font-semibold">Prestação de Serviços:</span> Para realizar o monitoramento e a busca das notificações judiciais conforme sua solicitação (uso do widget PJe).</li>
                        <li><span className="font-semibold">Autenticação:</span> Para gerenciar sua conta, incluindo login e acesso a áreas restritas.</li>
                        <li><span className="font-semibold">Comunicação:</span> Para enviar alertas sobre prazos, atualizações de serviço ou informações importantes sobre sua conta.</li>
                        <li><span className="font-semibold">Melhoria:</span> Analisar o uso do serviço para aprimorar a funcionalidade e a segurança do {productName}.</li>
                    </ul>
                </Section>
                
                {/* 4. Armazenamento e Segurança */}
                <Section title="4. Armazenamento e Segurança dos Dados">
                    <p>
                        Seus dados são armazenados em servidores seguros, utilizando criptografia e controles de acesso rigorosos para protegê-los contra perda, uso indevido e acesso não autorizado. As credenciais de acesso (senhas) são armazenadas utilizando criptografia irreversível (hashing).
                    </p>
                </Section>

                {/* 5. Compartilhamento de Informações */}
                <Section title="5. Compartilhamento de Informações">
                    <p>
                        A <span className="font-semibold">{organizationName}</span> não vende, aluga ou transfere suas informações pessoais a terceiros, exceto quando estritamente necessário para:
                    </p>
                    {/* Ajuste na margem da lista (ml-4 sm:ml-6) */}
                    <ul className="list-disc list-outside ml-4 sm:ml-6 mt-3 space-y-3">
                        <li>Cumprir obrigações legais ou ordens judiciais.</li>
                        <li>Operar o serviço (ex: provedores de hospedagem de dados, sob estritas cláusulas de confidencialidade).</li>
                    </ul>
                </Section>


                {/* Contato (Rodapé) - Agora também funciona como seção de Direitos do Titular */}
                {/* Reduzindo o padding superior (pt-6 mt-8) para otimizar o espaço vertical */}
                <footer className="pt-6 mt-8 border-t border-gray-200 text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Direitos do Titular e Contato</h2>
                    <p className="text-gray-600 max-w-lg mx-auto mb-4 text-sm sm:text-base">
                        Você tem o direito de solicitar a exclusão de seus dados a qualquer momento. Para exercer seus direitos ou para questões relacionadas a esta Política, entre em contato com nosso Encarregado de Dados (DPO):
                    </p>
                    <p className="mt-4 text-lg font-bold text-indigo-600">
                        <a href={`mailto:${contactEmail}`} className="hover:underline transition duration-150 ease-in-out">
                            {contactEmail}
                        </a>
                    </p>
                    <p className="mt-4 text-xs text-gray-400">
                        {organizationName}.
                    </p>
                </footer>

            </div>
        </div>
    );
};

export default PrivacyPolicy;