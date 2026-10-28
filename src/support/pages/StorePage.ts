import { expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BasePage from './BasePage';
import StoreElements from '../elements/StoreElements';

export default class StorePage extends BasePage {
  readonly storeElements: StoreElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.storeElements = new StoreElements(page);
  }

  async searchGame(): Promise<void> {
    await this.storeElements.getSearchField().focus();
    await this.storeElements.getSearchField().fill('The Wicther 3');
    await this.storeElements.getSearchButton().click();
  }

  async startSession(): Promise<void> {
    await this.storeElements.getStartSessionLink().click();
    await this.storeElements.getUsernameField().fill(faker.internet.username());
    await this.storeElements.getPasswordField().fill(faker.internet.password());
    await this.storeElements.getLoginButton().click();
  }

  async validateGamePage(): Promise<void> {
    await expect(this.storeElements.getGameTitle()).toHaveText(
      'The Witcher 3: Wild Hunt — Remastered'
    );
    await expect(this.storeElements.getGamePath()).toHaveText([
      'Todos os jogos',
      'RPG',
      'The Witcher 3: Wild Hunt — Remastered'
    ]);
    await expect(this.page).toHaveURL(/\/app\/292030/);
  }

  async validateLoginError(): Promise<void> {
    await expect(this.storeElements.getLoginError()).toBeVisible();
  }

  // Seção de demonstração

  async enterDemoSection(): Promise<void> {
    await this.storeElements.getSpecialSectionButton().click();
    await this.storeElements.getDemoLink().click();
  }

  async searchDemoGame(): Promise<void> {
    const demoInput = this.storeElements.getSearchDemoInput();

    await this.page.mouse.wheel(0, 3000);
    await demoInput.fill('onimusha');
  }

  async enterDemoGamePage(): Promise<StoreElements> {
    await this.storeElements.getDemoGameLink().click();

    const gamePage = await this.page.waitForEvent('popup');
    const gamePageElements: StoreElements = new StoreElements(gamePage);

    return gamePageElements;
  }

  // Validate

  async validateDemoPage(): Promise<void> {
    await expect(this.page).toHaveURL('https://store.steampowered.com/demos');
    await expect(this.storeElements.getDemoTitle()).toBeVisible();
  }

  async validateGameAppears(): Promise<void> {
    await expect(this.storeElements.getDemoGameButton()).toBeVisible();
  }

  async validateDemoGamePage(gamePageElements: StoreElements): Promise<void> {
    await expect(gamePageElements.getDemoGameTitle()).toHaveText(
      'Onimusha: Way of the Sword'
    );
  }
}
