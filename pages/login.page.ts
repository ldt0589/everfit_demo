import { BasePage } from './base.page';
import { expect, Locator, Page } from '@playwright/test';
import { LoginSelectors } from '../selectors/login.selector';

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator(LoginSelectors.usernameInput);
        this.passwordInput = page.locator(LoginSelectors.passwordInput);
        this.loginButton = page.getByRole(LoginSelectors.loginButton.role,{ name: LoginSelectors.loginButton.name });    
    }

    async openHomePage() {
        await this.navigate();
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        console.log(`Perform to login for username "${username}"`);
    }
}
