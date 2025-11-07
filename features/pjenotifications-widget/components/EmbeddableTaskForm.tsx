// features/search-widget/components/EmbeddableTaskForm.tsx

'use client'; // O formulário de busca precisa de interatividade, portanto, deve ser um Componente Cliente.

import React from 'react';
// Importa o formulário de busca real, que contém a lógica
import TaskSearchForm from './TaskSearchForm'; 

/**
 * Componente Wrapper para a versão embedável do formulário de busca.
 * Aplica estilos mínimos e garante isolamento.
 */
export default function EmbeddableTaskForm() {
    return (
        // Um contêiner que define o estilo base para o widget
        <div className="p-4 bg-white min-h-screen">
            
            {/* O formulário principal é renderizado aqui.
              Passamos uma prop 'isEmbed' (se TaskSearchForm aceitar) para ajustar 
              o comportamento ou estilos internos (ex: remover sombra, borda). 
            */}
            <TaskSearchForm 
                isEmbedded={true} 
                // Você pode adicionar props específicas aqui, como:
                // initialOAB={null}
            />

            <style jsx global>{`
                /* Estilos Globais específicos para o ambiente embedado */
                /* Garantem que o iframe não tenha margens desnecessárias do body/html */
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    background-color: transparent !important;
                }
            `}</style>
        </div>
    );
}