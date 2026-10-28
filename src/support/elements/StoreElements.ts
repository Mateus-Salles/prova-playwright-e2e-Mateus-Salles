import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class StoreElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getSearchField(): Locator {
    return this.page.getByRole('combobox', { name: 'Buscar na loja' });
  }

  getSearchButton(): Locator {
    return this.page.getByRole('link', {
      name: 'The Witcher 3: Wild Hunt — Remastered R$'
    });
  }

  getCleanSearchButton(): Locator {
    return this.page.getByRole('button', { name: 'Limpar termo de busca' });
  }

  getGameTitle(): Locator {
    return this.page.locator('#appHubAppName');
  }

  getGamePath(): Locator {
    return this.page.locator('.blockbg a');
  }

  getStartSessionLink(): Locator {
    return this.page.locator('a.global_action_link');
  }

  getUsernameField(): Locator {
    return this.page.getByLabel('Iniciar sessão com o nome de usuário');
  }

  getPasswordField(): Locator {
    return this.page.locator('input[type="password"]');
  }

  getLoginButton(): Locator {
    return this.page.getByRole('button', { name: 'Iniciar sessão' });
  }

  getLoginError(): Locator {
    return this.page.getByText(
      'Verifique a sua senha e nome de usuário e tente novamente.'
    );
  }

  // Seção de demonstração

  getSpecialSectionButton(): Locator {
    return this.page.getByRole('button', { name: 'Seções especiais' });
  }

  getDemoLink(): Locator {
    return this.page.getByRole('link', { name: 'Demonstrações' });
  }

  getDemoTitle(): Locator {
    return this.page.getByText('Demonstrações', { exact: true });
  }

  getSearchDemoInput(): Locator {
    //return this.page.getByRole('textbox', { name: 'Buscar por nome...' });

    //return this.page
    //  .locator('input[class="DialogInput"]')
    //  .filter({ hasText: 'Buscar por nome...' });

    return this.page.getByPlaceholder('Buscar por nome...');
  }

  getDemoGameButton(): Locator {
    return this.page.getByRole('button', {
      name: 'Onimusha: Way of the Sword DEMO Onimusha: Way of the Sword DEMO'
    });
  }

  getDemoGameLink(): Locator {
    return this.page
      .locator('a')
      .filter({ hasText: 'Onimusha: Way of the Sword' });
  }

  getDemoGameTitle(): Locator {
    return this.page.getByRole('heading', {
      name: 'Onimusha: Way of the Sword',
      exact: true
    });
  }
}
