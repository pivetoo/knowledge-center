import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const aqui = path.dirname(fileURLToPath(import.meta.url));
export const raiz = path.resolve(aqui, '..', '..');

// Credenciais nunca ficam no repositorio. Prioridade: .env.capture do proprio projeto;
// se nao existir, reaproveita o e2e/.env do AgencyCampaign (mesmo usuario de captura).
const CAMINHOS_ENV = [
  path.join(raiz, '.env.capture'),
  path.resolve(raiz, '..', '..', 'agency-campaign-os', 'AgencyCampaign', 'AgencyCampaign.Web', 'e2e', '.env'),
];

function carregarEnv() {
  for (const caminho of CAMINHOS_ENV) {
    if (!fs.existsSync(caminho)) continue;

    const valores = {};
    for (const linha of fs.readFileSync(caminho, 'utf8').split('\n')) {
      const limpa = linha.trim();
      if (!limpa || limpa.startsWith('#')) continue;
      const separador = limpa.indexOf('=');
      if (separador === -1) continue;
      valores[limpa.slice(0, separador).trim()] = limpa.slice(separador + 1).trim();
    }

    if (valores.E2E_USER && valores.E2E_PASSWORD) {
      return {
        origem: caminho,
        baseURL: (valores.E2E_BASE_URL ?? 'https://agencias.mainstay.com.br').replace(/\/$/, ''),
        usuario: valores.E2E_USER,
        senha: valores.E2E_PASSWORD,
      };
    }
  }

  throw new Error(
    `Credenciais de captura nao encontradas. Crie ${path.relative(raiz, CAMINHOS_ENV[0])} com E2E_BASE_URL, E2E_USER e E2E_PASSWORD.`,
  );
}

// 1920x1080 (16:9). Em 1440x900 as capturas ficavam com aspecto quadrado demais e as telas de
// lista cortavam colunas da direita.
export const VIEWPORT = { width: 1920, height: 1080 };

export async function abrirSessao({ headless = true } = {}) {
  const env = carregarEnv();
  console.log(`Credenciais lidas de ${path.relative(raiz, env.origem)} (usuario e senha nao sao exibidos).`);

  const navegador = await chromium.launch({ headless });
  const contexto = await navegador.newContext({
    viewport: VIEWPORT,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    deviceScaleFactor: 2,
    colorScheme: 'light',
  });
  const pagina = await contexto.newPage();

  await pagina.goto(`${env.baseURL}/`, { waitUntil: 'domcontentloaded' });
  await pagina.waitForURL(/auth\./, { timeout: 30_000 });

  const campoEmail = pagina.getByRole('textbox', { name: /E-mail|usuário|username/i }).first();
  const campoSenha = pagina
    .getByRole('textbox', { name: /Senha|password/i })
    .or(pagina.locator('input[type="password"]'))
    .first();

  await campoEmail.waitFor({ state: 'visible', timeout: 20_000 });
  await campoEmail.fill(env.usuario);
  await campoSenha.fill(env.senha);
  await pagina.getByRole('button', { name: /Entrar|Login/i }).first().click();

  await pagina.waitForURL(new RegExp(env.baseURL.replace(/^https?:\/\//, '').replace(/\./g, '\\.')), {
    timeout: 45_000,
  });
  await pagina.waitForLoadState('networkidle').catch(() => {});

  return { navegador, contexto, pagina, baseURL: env.baseURL };
}

// A UI carrega dados por requisicao; sem esperar o esqueleto sumir a captura pega a tela vazia.
export async function aguardarTelaPronta(pagina, { seletor, espera = 1200 } = {}) {
  await pagina.waitForLoadState('networkidle').catch(() => {});
  if (seletor) {
    await pagina.locator(seletor).first().waitFor({ state: 'visible', timeout: 30_000 });
  }
  await pagina.waitForTimeout(espera);
}
