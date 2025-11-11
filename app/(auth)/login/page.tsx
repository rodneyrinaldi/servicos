// app/(auth)/login/page.tsx

import React from 'react';
import LoginForm from '@/features/auth/components/LoginForm'; // Importa o componente de formulário

// Componente da página de Login
// Nota: O layout visual (centralização, fundo) é definido em app/(auth)/layout.tsx
const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      
      {/* O componente LoginForm contém a lógica de estado e interação com a API.
        Ele deve ser importado da pasta de features (features/auth/components/).
      */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;