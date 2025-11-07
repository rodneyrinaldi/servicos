// app/termos-de-uso/page.tsx

import React from 'react';
import Link from 'next/link';

const TermsOfService: React.FC = () => {
    
    // Variáveis internas em inglês
    const lastUpdated: string = "7th November 2025";
    const organizationName: string = "Task Pilot (R2 Tecnologia)";
    const contactEmail: string = "suporte@taskpilot.com.br";
    
    return (
        // 🚨 Container principal (simula o body e o container)
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-lg border border-gray-200">
                
                {/* Título Principal */}
                <header className="mb-8 border-b-2 border-blue-100 pb-4">
                    {/* Cor azul primária similar ao Google Blue */}
                    <h1 className="text-3xl font-extrabold text-blue-700">Termos de Uso</h1> 
                    <p className="mt-1 text-sm text-gray-500">Última atualização: {lastUpdated}</p>
                </header>

                {/* 1. Aceitação dos Termos */}
                <section className="mb-8 text-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">1. Aceitação dos Termos</h2>
                    <p>
                        Ao acessar ou usar a plataforma **Task Pilot** e seus serviços (incluindo o widget de busca de notificações PJe), você concorda com estes Termos de Uso, com a nossa <Link href="/politica-de-privacidade" className="text-blue-600 hover:underline font-medium">Política de Privacidade</Link> e todas as leis e regulamentos aplicáveis. Se você não concordar com estes Termos, não utilize o serviço.
                    </p>
                </section>

                {/* 2. O Serviço */}
                <section className="mb-8 text-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">2. Objeto do Serviço</h2>
                    <p>
                        O Task Pilot é uma plataforma de <span className="font-bold">monitoramento e consulta de comunicações processuais eletrônicas (PJe)</span>, destinada a advogados, escritórios de advocacia e profissionais do direito. Nosso serviço consiste em fornecer um mecanismo rápido para consultar a situação de notificações e prazos mediante o fornecimento de dados de identificação do advogado (OAB/UF).
                    </p>
                </section>

                {/* 3. Licença de Uso */}
                <section className="mb-8 text-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">3. Licença de Uso</h2>
                    <p>
                        Concedemos a você uma licença limitada, não exclusiva, intransferível e revogável para usar o Task Pilot exclusivamente para fins profissionais e em conformidade com estes Termos. A plataforma **não é vendida, mas sim licenciada** para uso.
                    </p>
                </section>

                {/* 4. Propriedade Intelectual */}
                <section className="mb-8 text-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">4. Propriedade Intelectual</h2>
                    <p>
                        Todo o conteúdo, software, algoritmos, design e marcas do Task Pilot são propriedade exclusiva da **{organizationName}** e protegidos por leis de direitos autorais e propriedade industrial. É estritamente proibida a reprodução, engenharia reversa, distribuição ou uso comercial não autorizado de qualquer parte do software.
                    </p>
                </section>
                
                {/* 5. Responsabilidades do Usuário */}
                <section className="mb-8 text-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">5. Responsabilidades do Usuário</h2>
                    <p>
                        Você concorda em:
                    </p>
                    <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                        <li>Fornecer informações de registro precisas e manter sua senha segura.</li>
                        <li>Não utilizar o serviço para fins ilícitos, incluindo o acesso não autorizado a informações judiciais de terceiros.</li>
                        <li>Reconhecer que os dados fornecidos pelo widget são informativos e não substituem a intimação oficial ou a conferência nos autos eletrônicos.</li>
                    </ul>
                </section>

                {/* 6. Limitação de Responsabilidade */}
                <section className="mb-8 text-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">6. Limitação de Responsabilidade</h2>
                    <p>
                        A Task Pilot é fornecida como está e não garante a precisão, integridade ou pontualidade de todas as informações provenientes de fontes externas (PJe, Diários, etc.). Em nenhuma circunstância a {organizationName} será responsável por quaisquer danos diretos, indiretos ou perda de prazos processuais decorrentes do uso (ou incapacidade de uso) do serviço. O usuário é o único responsável pela conferência e cumprimento dos prazos.
                    </p>
                </section>

                {/* Contato */}
                <footer className="pt-6 mt-8 border-t border-dashed border-gray-400 text-center text-gray-500">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Contato</h2>
                    <p className="text-gray-700">
                        Para quaisquer dúvidas ou esclarecimentos sobre estes Termos, entre em contato:
                    </p>
                    <p className="mt-2 font-bold text-blue-600">Email: <a href={`mailto:${contactEmail}`} className="hover:underline">{contactEmail}</a></p>
                </footer>

            </div>
        </div>
    );
};

export default TermsOfService;