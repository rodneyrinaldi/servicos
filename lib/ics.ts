// src/lib/ics.ts
import { ProcessoResumo } from '../types';

const formatICSDate = (dateString: string): string => {
    const [yyyy, mm, dd] = dateString.split('-');
    return `${yyyy}${mm}${dd}T120000Z`;
};

export const createICSContent = (results: ProcessoResumo[]): string => {
    if (results.length === 0) return '';
    
    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const header = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TaskPilot//PJE Communications v1.0//BR\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n`;
    let events = '';

    results.forEach((event) => {
        const uid = `${Date.now()}-${event.numero}@taskpilot.com.br`;
        const dtstart = formatICSDate(event.data);
        const dtend = dtstart.replace('T120000Z', 'T130000Z'); 
        
        const summary = `Processo Judicial: ${event.numero}`; 
        
        // Escapando caracteres
        const escapedDescription = event.descricao
            .replace(/\\/g, '\\\\')
            .replace(/,/g, '\\,')
            .replace(/;/g, '\\;')
            .replace(/(\r\n|\n|\r)/gm, "\\n")
            .trim(); 
            
        const description = `Descrição: ${escapedDescription}\\n\\nAPI PJe - Acompanhamento de processo judicial via sistema eletrônico.`;

        events += `BEGIN:VEVENT\nUID:${uid}\nDTSTAMP:${now}\nDTSTART:${dtstart}\nDTEND:${dtend}\n`; 
        events += `SUMMARY:${summary}\nDESCRIPTION:${description}\n`;
        events += `LOCATION:Tribunal de Justiça - Eletrônico\nSTATUS:NEEDS-ACTION\nPRIORITY:1\nCLASS:PUBLIC\n`;
        events += `ORGANIZER;CN=TaskPilot:mailto:contato@taskpilot.com.br\nEND:VEVENT\n`;
    });

    return header + events + 'END:VCALENDAR\n';
};