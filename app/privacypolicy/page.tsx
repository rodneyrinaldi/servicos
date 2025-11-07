// app/politica-de-privacidade/page.tsx

import React from 'react';

const PrivacyPolicy: React.FC = () => {
  
  // Variáveis internas em inglês:
  const lastUpdated: string = "7th November 2025";
  const contactEmail: string = "privacidade@taskpilot.com.br";
  const organizationName: string = "Task Pilot (R2 Tecnologia)";
  
  return (
    // 🚨 Container principal (simula o body e o container)
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8"> 
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-lg border border-gray-200">
            
            {/* Título Principal */}
            <header className="mb-8 border-b-2 border-blue-100 pb-4">
                {/* Cor azul primária similar ao Google Blue (#1a73e8) */}
                <h1 className="text-3xl font-extrabold text-blue-700">Política de Privacidade</h1> 
                <p className="mt-1 text-sm text-gray-500">Última atualização: {lastUpdated}</p>
            </header>

            {/* Seção de Introdução */}
            <section className="mb-8 text-gray-700">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">Introdução</h2>
                <p className="mt-4">
                    A **{organizationName}** tem o compromisso de proteger sua privacidade. Esta política descreve como coletamos, usamos, armazenamos e compartilhamos suas informações pessoais ao utilizar nossos serviços de monitoramento de prazos e comunicações PJe. Ao acessar e utilizar o Task Pilot, você concorda com os termos desta Política de Privacidade.
                </p>
            </section>

            {/* 1. Informações que Coletamos */}
            <section className="mb-8 text-gray-700">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">1. Informações que Coletamos</h2>
                
                <h3 className="text-xl font-medium text-gray-700 mt-4">1.1. Dados Fornecidos por Você</h3>
                <p className="mt-2">
                    Coletamos as informações que você nos fornece diretamente ao se cadastrar ou utilizar nossos formulários, incluindo:
                </p>
                <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                    <li>**Dados de Identificação e Contato:** Nome, email e senha criptografada.</li>
                    <li>**Dados de Acesso a Serviços Judiciais:** Número da OAB e UF para realizar buscas e monitoramento de notificações (PJe).</li>
                </ul>
            </section>
            
            {/* ... (Seções 2, 3 e 4 mantidas no mesmo estilo) ... */}

            {/* 2. Como Usamos Suas Informações */}
            <section className="mb-8 text-gray-700">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">2. Como Usamos Suas Informações</h2>
                <p>
                    Utilizamos suas informações para as seguintes finalidades:
                </p>
                <ul className="list-disc list-inside ml-8 mt-2 space-y-2">
                    <li>**Prestação de Serviços:** Para realizar o monitoramento e a busca das notificações judiciais conforme sua solicitação (uso do widget PJe).</li>
                    <li>**Autenticação:** Para gerenciar sua conta, incluindo login e acesso a áreas restritas.</li>
                    <li>**Comunicação:** Para enviar alertas sobre prazos, atualizações de serviço ou informações importantes sobre sua conta.</li>
                </ul>
            </section>
            
            {/* 3. Armazenamento e Segurança */}
            <section className="mb-8 text-gray-700">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">3. Armazenamento e Segurança</h2>
                <p>
                    Seus dados são armazenados em servidores seguros, utilizando criptografia e controles de acesso rigorosos para protegê-los contra perda, uso indevido e acesso não autorizado. As senhas são armazenadas utilizando criptografia irreversível (hashing).
                </p>
            </section>
            
            {/* 4. Contato */}
            <footer className="pt-6 mt-8 border-t border-dashed border-gray-400 text-center text-gray-500">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contato</h2>
                <p className="text-gray-700">
                    Para questões relacionadas a esta Política de Privacidade ou a seus dados pessoais, entre em contato com nosso Encarregado de Dados (DPO):
                </p>
                <p className="mt-2 font-bold text-blue-600">Email: <a href={`mailto:${contactEmail}`} className="hover:underline">{contactEmail}</a></p>
                <p className="mt-4 text-sm">{organizationName}.</p>
            </footer>

        </div>
    </div>
  );
};

export default PrivacyPolicy;