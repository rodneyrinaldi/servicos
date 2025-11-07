// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Task Pilot - Agendamento de Tarefas Jurídicas',
  description: 'Acesso instantâneo a movimentações judiciais e agendamento automático no seu calendário.',
};

export default function RootLayout(
  {children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}