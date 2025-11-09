// components/TaskPilotLogo.tsx

import React from 'react';
import Image from 'next/image';
import XImage from '../public/images/logo-taskpilot.png'; 

interface TaskPilotLogoProps {
    className?: string;
}

const TaskPilotLogo: React.FC<TaskPilotLogoProps> = ({ className = 'w-40 h-10' }) => (

    <div className={`relative ${className}`}>

        <Image 
            src={XImage}
            alt="Logo da Aplicação"
            fill 
            style={{ objectFit: 'contain' }} 
            priority 
        />
    </div>
);

export default TaskPilotLogo;