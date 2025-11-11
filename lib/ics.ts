// src/lib/ics.ts
import { ProcessoResumo } from '../types';

/**
 * Função auxiliar para formatar a data no padrão ICS (AAAA-MM-DDT[HHMMSS]Z)
 * @param dateString Data no formato AAAA-MM-DD
 * @param timeString Hora em UTC no formato HHMMSSZ (ex: '120000Z' ou '060000Z')
 */
const formatICSDate = (dateString: string, timeString: '060000Z' | '120000Z'): string => {
    const [yyyy, mm, dd] = dateString.split('-');
    return `${yyyy}${mm}${dd}T${timeString}`;
};

/**
 * Determina DTSTART e DTEND baseado na busca por prazos na descrição.
 * @returns Um objeto contendo as strings formatadas para dtstart e dtend.
 */
const getEventTimes = (startDateString: string, description: string): { dtstart: string, dtend: string } => {
    // Expressão regular para encontrar a palavra "prazo" seguida de um número e "dias"
    const regex = /prazo.*?(\d+)\s*dias/i;
    const match = description.match(regex);

    // CASO 1: Prazo encontrado (evento multi-dias)
    if (match && match[1]) {
        const daysToAdd = parseInt(match[1], 10);
        
        // DTSTART: Data inicial às 12:00:00 UTC
        const dtstart = formatICSDate(startDateString, '120000Z');

        // Calcula a data final: Data inicial + dias
        // Criamos o objeto Date em 12:00:00Z para evitar problemas de fuso horário local
        const date = new Date(startDateString + 'T12:00:00Z'); 
        date.setDate(date.getDate() + daysToAdd);
        
        // Formata a nova data para AAAA-MM-DD
        const newDateString = date.toISOString().split('T')[0];
        
        // DTEND: Data calculada às 12:00:00 UTC
        const dtend = formatICSDate(newDateString, '120000Z');
        
        return { dtstart, dtend };
    }

    // CASO 2: Prazo NÃO encontrado (novo comportamento padrão)
    // Evento de duração zero às 06:00:00 UTC
    const defaultTime = '060000Z';
    
    // DTSTART: Data inicial às 06:00:00 UTC
    const dtstart = formatICSDate(startDateString, defaultTime);
    
    // DTEND: Igual a DTSTART para um evento de duração zero no iCalendar
    const dtend = dtstart; 
    
    return { dtstart, dtend };
};

export const createICSContent = (results: ProcessoResumo[]): string => {
    if (results.length === 0) return '';
    
    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const header = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TaskPilot//PJE Communications v1.0//BR\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n`;
    let events = '';

    results.forEach((event) => {
        const uid = `${Date.now()}-${event.numero}@taskpilot.com.br`;
        
        // CHAVE DE MUDANÇA: Obtém DTSTART e DTEND da nova função
        const { dtstart, dtend } = getEventTimes(event.data, event.descricao);
        
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