import { expect, authTest as test } from '../fixtures/auth.fixture';
import { allure } from 'allure-playwright/dist';
import { AskOllyPage } from '../pages/askOlly.page';
import { ClientPage } from '../pages/client.page';
import { workout } from '../data/promts/askOlly.prompt';
import { verifyAskOllyURLReseted, verifyMessageContainerReseted, verifyMessageCount } from '../assertions/askOlly.assert';

test.describe(`ASK OLLY - Conversation`, async () => {
    test('[@convor_01] User can start a new chat successfully @ask_olly', async ({ loginPage, page }) => {
        const askOllyPage = new AskOllyPage(page);
        const clientPage = new ClientPage(page);

        await allure.step(`[Step_1]: Open Ask Olly page`, async () => {
            await clientPage.openAskOllyPage();
        });

        await allure.step(`[Step_2]: Ask Olly a question about workout assignments next week`, async () => {
            await askOllyPage.ask(workout.plan_next_week_prompt);
        });

        await allure.step(`[Step_3]: Wait for Olly to finish streaming response`, async () => {
            await askOllyPage.waitForOllyResponse();
            await askOllyPage.waitForStreamDone();
        });

        await allure.step(`[Step_4]: Start a new chat`, async () => {
            await askOllyPage.startNewChat();
        });

        await allure.step(`[Step_5]: Verify New Chat opened successfully`, async () => {
            await verifyMessageContainerReseted(page);
            await verifyAskOllyURLReseted(page);
        });
    });
    test('[@convor_02] User can ask multiple prompts in a conversation successfully @ask_olly', async ({ loginPage, page }) => {
        const askOllyPage = new AskOllyPage(page);
        const clientPage = new ClientPage(page);

        await allure.step(`[Step_1]: Open Ask Olly page`, async () => {
            await clientPage.openAskOllyPage();
        });

        await allure.step(`[Step_2]: Ask Olly a question about workout assignments this week`, async () => {
            await askOllyPage.ask(workout.plan_this_week_prompt);
            
        });

        await allure.step(`[Step_3]: Wait for Olly to finish streaming response`, async () => {
            await askOllyPage.waitForOllyResponse();
            await askOllyPage.waitForStreamDone();
        });

        await allure.step(`[Step_4]: Continue to ask Olly a question about workout assignments next week`, async () => {
            await askOllyPage.ask(workout.plan_next_week_prompt);
            await askOllyPage.waitForOllyResponse();
        });

        await allure.step(`[Step_5]: Verify the conversation includes 4 messages totaly`, async () => {
            await verifyMessageCount(page, 4);
        });
    });
});
