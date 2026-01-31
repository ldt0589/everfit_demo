import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ClientPage } from '../pages/client.page';
import { AuthConfig } from '../configurations/auth.config';

type Fixtures = {
  loginPage: LoginPage;
};

export const authTest = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.openHomePage();
    await loginPage.login(AuthConfig.username, AuthConfig.password);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';