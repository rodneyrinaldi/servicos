// app/widget/embed/page.tsx
import React from 'react'; // Não estritamente necessário no Next.js 13/14, mas é boa prática
// Ajuste do caminho de importação para a nova localização do wrapper do widget
import EmbeddableTaskForm from '@/features/pjenotifications-widget/components/EmbeddableTaskForm';

/**
 * Esta é a página que será carregada dentro do iframe.
 * Ela usa o layout mínimo e é otimizada para ser embedada em sites de terceiros.
 * * NOTA: Em um projeto real com App Router, você pode precisar de um layout.tsx
 * minimalista nesta pasta para remover cabeçalhos/rodapés globais da aplicação principal.
 */
export default function EmbedPage() {
    return (
        // O fundo 'bg-transparent' é crucial para que o widget se integre ao site do cliente
        <div className="min-h-screen bg-transparent">
            <EmbeddableTaskForm />
        </div>
    );
}