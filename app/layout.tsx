// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Serviços Advocatícios',
  description: 'Automação para Escritórios de Advocacia.',
};

export default function RootLayout(
  {children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}