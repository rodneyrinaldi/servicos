@echo off
REM ==============================================================================
REM TASK PILOT - SCRIPT MONOLÍTICO PARA WINDOWS CMD (.BAT)
REM Cria toda a estrutura de pastas e arquivos de código.
REM ==============================================================================

SET PROJECT_DIR=task-pilot
echo.
echo ========================================================
echo INICIANDO CONFIGURACAO MONOLITICA DO PROJETO TASK PILOT
echo ========================================================
echo.

REM CRIA O DIRETORIO RAIZ E ENTRA NELE
if not exist %PROJECT_DIR% (
    mkdir %PROJECT_DIR%
    cd %PROJECT_DIR%
) else (
    echo O diretorio %PROJECT_DIR% ja existe. Entrando nele.
    cd %PROJECT_DIR%
)

REM CRIA A ESTRUTURA DE PASTAS INTERNAS
echo Criando estrutura de pastas...
mkdir app
mkdir app\api
mkdir app\api\busca
mkdir app\api\ics
mkdir app\api\cadastro
mkdir app\api\cron
mkdir app\components
mkdir app\components\ui
mkdir app\components\layouts
mkdir app\lib
mkdir .github
mkdir .github\workflows

REM ==============================================================================
REM 1. ARQUIVOS DE CONFIGURAÇÃO DE CONTROLE
REM ==============================================================================

echo Criando arquivos de configuracao base...

REM package.json
(
echo {
echo   "name": "task-pilot",
echo   "version": "1.0.0",
echo   "private": true,
echo   "scripts": {
echo     "dev": "next dev",
echo     "build": "next build",
echo     "start": "next start",
echo     "lint": "next lint"
echo   },
echo   "dependencies": {
echo     "@vercel/postgres": "^0.8.0",
echo     "ical-generator": "^7.1.0",
echo     "next": "latest",
echo     "react": "latest",
echo     "react-dom": "latest",
echo     "resend": "^3.2.0",
echo     "typescript": "latest"
echo   },
echo   "devDependencies": {
echo     "@types/node": "latest",
echo     "@types/react": "latest",
echo     "@types/react-dom": "latest",
echo     "autoprefixer": "latest",
echo     "postcss": "latest",
echo     "tailwindcss": "latest"
echo   }
echo }
) > package.json

REM .env.local
(
echo POSTGRES_URL="[SUA_URL_DO_VERCEL_POSTGRES]"
echo API_JUDICIAL_SECRET_KEY="SUA_CHAVE_SECRETA_DA_API_JUDICIAL"
echo CRON_JOB_KEY="CHAVE_SECRETA_DO_GITHUB_ACTIONS"
) > .env.local

REM .gitignore
(
echo /node_modules
echo /.next
echo .env.local
echo .DS_Store
) > .gitignore

REM .github/workflows/daily-task-pilot-cron.yml
(
echo name: Rotina Diaria de Leads (Task Pilot Cron)
echo on:
echo   schedule:
echo     - cron: '0 8 * * *'
echo   workflow_dispatch:
echo jobs:
echo   run_cron_job:
echo     runs-on: ubuntu-latest
echo     steps:
echo       - name: Disparar Handler do Cron de Leads
echo         env:
echo           VERCEL_APP_URL: ^${{ github.repository }}.vercel.app
echo           CRON_JOB_KEY: ^${{ secrets.CRON_JOB_KEY }}
echo         run: curl -s -f -X GET "https://^${{ env.VERCEL_APP_URL }}/api/cron?key=^${{ env.CRON_JOB_KEY }}"
) > .github\workflows\daily-task-pilot-cron.yml

REM app/globals.css
(
echo @tailwind base;
echo @tailwind components;
echo @tailwind utilities;
echo body {
echo   background-color: #1A202C; /* Fundo escuro */
echo }
) > app\globals.css


REM ==============================================================================
REM 2. LOGICA COMPARTILHADA (lib)
REM ==============================================================================

REM app/lib/db.ts
(
echo // app/lib/db.ts
echo import { sql } from '@vercel/postgres';
echo export interface Subscriber { /* ... */ }
echo export const db = {
echo   async createSubscriber(data: any) { /* ... Persistencia ... */ },
echo   async getNewLeads() { return []; }
echo };
) > app\lib\db.ts

REM app/lib/icsGenerator.ts
(
echo // app/lib/icsGenerator.ts
echo import { createEvents } from 'ical-generator';
echo export type Processo = { data: string; descricao: string; numeroProcesso: string; vara: string; };
echo export function createIcsFile(processos: Processo[]): string {
echo   /* ... Logica de geracao ICS ... */
echo   return createEvents([], { name: 'Task Pilot' }).toString();
echo }
) > app\lib\icsGenerator.ts


REM ==============================================================================
REM 3. LOGICA DO BACK-END (API Routes)
REM ==============================================================================

REM app/api/busca/route.ts
(
echo // app/api/busca/route.ts - PROXY API
echo import { NextResponse, NextRequest } from 'next/server';
echo export async function POST(request: NextRequest) {
echo   /* ... Logica de Proxy, Cookies e Busca ... */
echo   return NextResponse.json({ results: [] });
echo }
) > app\api\busca\route.ts

REM app/api/ics/route.ts
(
echo // app/api/ics/route.ts - GERAÇÃO ICS
echo import { createIcsFile } from '@/lib/icsGenerator';
echo export async function GET(request: NextRequest) {
echo   /* ... Logica de Geração ICS ... */
echo   return new Response('ICS Content');
echo }
) > app\api\ics\route.ts

REM app/api/cadastro/route.ts
(
echo // app/api/cadastro/route.ts - PERSISTÊNCIA DE LEADS
echo import { db } from '@/lib/db';
echo export async function POST(request: NextRequest) {
echo   /* ... Logica de persistencia no DB ... */
echo   return NextResponse.json({ message: 'Inscricao enviada.' });
echo }
) > app\api\cadastro\route.ts

REM app/api/cron/route.ts
(
echo // app/api/cron/route.ts - CRON JOB HANDLER
echo export async function GET(request: NextRequest) {
echo   /* ... Logica de seguranca e processamento de leads ... */
echo   return NextResponse.json({ message: 'Rotina Cron executada.' });
echo }
) > app\api\cron\route.ts


REM ==============================================================================
REM 4. FRONT-END E TELAS (Componentes)
REM ==============================================================================

REM app/components/ui/Logo.tsx
(
echo // app/components/ui/Logo.tsx
echo import React from 'react';
echo const TaskPilotLogo = () => (
echo   <div className="flex items-center space-x-3">
echo     <div className="w-10 h-10 bg-cyan-400/20 rounded-lg flex items-center justify-center text-cyan-400 font-bold">⚖️🗓️</div>
echo     <span className="text-4xl font-bold">
echo       <span className="text-white">Task</span> <span className="text-cyan-400">Pilot</span>
echo     </span>
echo   </div>
echo );
echo export default TaskPilotLogo;
) > app\components\ui\Logo.tsx

REM app/components/TaskSearch.tsx
(
echo // app/components/TaskSearch.tsx
echo 'use client';
echo import React, { useState } from 'react';
echo export function TaskSearch({ initialOab }: { initialOab: string }) {
echo   /* ... Implementacao da busca e resultados (Design 1) ... */
echo   return (<form><button>Buscar Processos</button></form>);
echo }
) > app\components\TaskSearch.tsx

REM app/components/EngagementModules.tsx
(
echo // app/components/EngagementModules.tsx
echo 'use client';
echo import React from 'react';
echo export function EngagementModules() {
echo   /* ... Logica de exibicao dos modulos (Design 2, 3, 4) ... */
echo   return (<div />);
echo }
) > app\components\EngagementModules.tsx

REM app/layout.tsx
(
echo // app/layout.tsx
echo import './globals.css';
echo import type { Metadata } from 'next';
echo export const metadata = { title: 'Task Pilot', description: 'Agendamento de Tarefas Jurídicas', };
echo export default function RootLayout({ children }) {
echo   return (<html lang="pt-BR"><body>{children}</body></html>);
echo }
) > app\layout.tsx

REM app/page.tsx
(
echo // app/page.tsx (Server Component - Layout principal)
echo import { TaskSearch } from '@/components/TaskSearch';
echo import { EngagementModules } from '@/components/EngagementModules';
echo import TaskPilotLogo from '@/components/ui/Logo';
echo import { cookies } from 'next/headers';
echo 
echo export default function Home() {
echo   const oabCookie = cookies().get('task_pilot_oab')?.value || '';
echo 
echo   return (
echo     <main className="min-h-screen bg-[#1A202C] flex flex-col items-center justify-center p-4">
echo       <div className="w-full max-w-lg">
echo         <div className="text-center mb-8"><TaskPilotLogo /></div>
echo         <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
echo           <TaskSearch initialOab={oabCookie} />
echo         </div>
echo         <div className="mt-8"><EngagementModules /></div>
echo         <div className="text-center text-gray-400 mt-12 text-sm">... Rodape ...</div>
echo       </div>
echo     </main>
echo   );
echo }
) > app\page.tsx

REM FINALIZACAO
echo.
echo ==============================================================================
echo Projeto Task Pilot Criado com Sucesso! (Script Monolitico CMD)
echo ==============================================================================
echo.
echo PASSO 1: Voce esta no diretorio %PROJECT_DIR%.
echo PASSO 2: Instale o Next.js e dependencias: npm install
echo PASSO 3: Preencha os blocos de codigo '/* ... */' nos arquivos .ts e .tsx.
echo.
pause