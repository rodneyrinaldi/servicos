// app/(auth)/login/page.tsx

import React from 'react';
import LoginForm from '@/features/auth/components/LoginForm'; // Importa o componente de formulário
import Link from 'next/link';

// Componente da página de Login
// Nota: O layout visual (centralização, fundo) é definido em app/(auth)/layout.tsx
const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      
      {/* O componente LoginForm contém a lógica de estado e interação com a API.
        Ele deve ser importado da pasta de features (features/auth/components/).
      */}
      <LoginForm />

      {/* Opções Adicionais e Links de Navegação */}
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
          Não tem uma conta?{' '}
          <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Crie sua conta
          </Link>
        </p>
        <p>
          <Link href="/forgotpassword" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Esqueceu sua senha?
          </Link>
        </p>
      </div>
      
    </div>
  );
};

export default LoginPage;