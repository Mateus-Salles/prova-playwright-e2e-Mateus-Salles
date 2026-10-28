import { test } from '@playwright/test';
import { join } from 'path';
import StorePage from '../support/pages/StorePage';
import { TheConfig } from 'sicolo';

test.describe('Steam Store', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let storePage: StorePage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.store')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    storePage = new StorePage(page);
    await page.goto(BASE_URL);
  });

  test('Deve realizar a pesquisa por um jogo', async () => {
    await storePage.searchGame();
    await storePage.validateGamePage();
  });

  test('Deve dar um erro ao tentar um login', async () => {
    await storePage.startSession();
    await storePage.validateLoginError();
  });

  test('Deve verificar a seção de demonstrações e fazer a busca por um demo de um jogo e entrar na página', async () => {
    await storePage.enterDemoSection();
    await storePage.validateDemoPage();

    await storePage.searchDemoGame();
    await storePage.validateGameAppears();

    const newPage = await storePage.enterDemoGamePage();
    await storePage.validateDemoGamePage(newPage);
  });
});
/*
test('Deve verificar a seção de demonstrações e fazer a busca por um demo de um jogo', () => {

})


import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://store.steampowered.com/');
  await page.getByRole('button', { name: 'Seções especiais' }).click();
  await page.getByRole('link', { name: 'Demonstrações' }).click();
  await page.locator('._150kddWk8JgylTvh_eC20b > div').click();
  await page.getByText('Demonstrações', { exact: true }).click();
  await page.getByRole('button', { name: 'Na lista de desejos Ignorado' }).click();
  await page.getByRole('button', { name: 'Instalar e iniciar a demonstração de Find The Needle Demo Instalar demo', exact: true }).click();
  await page.locator('div').filter({ hasText: 'Steam instalado? O aplicativo' }).nth(2).click();
  await page.getByRole('link', { name: 'Não, preciso do Steam Saiba' }).click();
  await page.getByText('O Steam é o destino perfeito para jogar, criar jogos e conversar. Instale o').click();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#about_features_more').getByRole('link', { name: 'Instale o Steam' }).click();:

  import { test, expect } from '@playwright/test';

  test('test', async ({ page }) => {
    await page.goto('https://store.steampowered.com/');
    await page.getByRole('button', { name: 'Seções especiais' }).click();
    await page.getByRole('link', { name: 'Demonstrações' }).click();
    await page.locator('._150kddWk8JgylTvh_eC20b > div').click();
    await page.getByText('Demonstrações', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Buscar por nome...' }).click();
    await page.getByRole('textbox', { name: 'Buscar por nome...' }).fill('');
    await page.getByRole('textbox', { name: 'Buscar por nome...' }).click();
    await page.getByRole('textbox', { name: 'Buscar por nome...' }).fill('onimusha');
    const page1Promise = page.waitForEvent('popup');
    await page.locator('a').filter({ hasText: 'Onimusha: Way of the Sword' }).click();
    const page1 = await page1Promise;
    await page1.getByText('Um samurai que empunha uma').click();
    await page1.getByRole('heading', { name: 'Onimusha: Way of the Sword', exact: true }).click();
    await page.getByRole('button', { name: 'Onimusha: Way of the Sword DEMO + Lista de desejos Onimusha: Way of the Sword' }).click();
  });*/
