// app/(auth)/signup/page.tsx

import React from 'react';
// Importa o componente de formulário que já escrevemos
import ResetPwdForm from '@/features/auth/components/ResetPwdForm'; 
import Link from 'next/link';

// Componente da página de Cadastro (Signup)
// Nota: O layout visual é definido em app/(auth)/layout.tsx
const SignupPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      
      {/* O componente ResetPwdForm contém a lógica de estado e interação com a API. */}
      <ResetPwdForm />

      {/* Opções Adicionais e Links de Navegação */}
      <div className="mt-4 text-sm text-center text-gray-600">
        <p>
          Ao se cadastrar, você concorda com nossos</p>
        <p>
          <Link href="/termsofservice" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Termos de Uso
          </Link>
          {' '}e{' '}
          <Link href="/privacypolicy" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Política de Privacidade
          </Link>
        </p>
      </div>
      
    </div>
  );
};

export default SignupPage;