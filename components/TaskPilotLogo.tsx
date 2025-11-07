// components/TaskPilotLogo.tsx

import React from 'react';
// Importação da constante GOOGLE_BLUE, que está agora dentro da Feature Landing Page
// O caminho foi ajustado para sair de /components e ir para /features/landing-page/data.tsx
import { GOOGLE_BLUE } from '../features/landing-page/data'; 

interface TaskPilotLogoProps {
    className?: string;
}

const TaskPilotLogo: React.FC<TaskPilotLogoProps> = ({ className = 'w-40 h-10' }) => (
    <div className={`flex items-center justify-center ${className}`}>
        <span className={`text-4xl font-black text-gray-800`}>
            **Task**
        </span>
        <span className={`text-4xl font-black ${GOOGLE_BLUE}`}>
            **Pilot**
        </span>
    </div>
);

export default TaskPilotLogo;