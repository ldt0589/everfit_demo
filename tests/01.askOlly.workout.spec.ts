import { expect, authTest as test } from '../fixtures/auth.fixture';
import { allure } from 'allure-playwright/dist';
import { AskOllyPage } from '../pages/askOlly.page';
import { ClientPage } from '../pages/client.page';
import { fetchWorkoutAssignments } from '../api/workout/workout.api';
import { verifyWorkoutOverviewByAI } from '../ai/assertions/workout.assert';
import { workout } from '../data/promts/askOlly.prompt';

test.describe(`ASK OLLY - Workout plan`, async () => {
    test('[@ask_olly_01] Ask Olly about the overview of future workout assignment plans @ask_olly', async ({ loginPage, page }) => {
        const askOllyPage = new AskOllyPage(page);
        const clientPage = new ClientPage(page);

        await allure.step(`[Step_1]: Open Ask Olly page`, async () => {
            await clientPage.openAskOllyPage();
        });

        const OllyResponse = await allure.step(`[Step_2]: Ask Olly a question about workout assignments next week`, async () => {
            await askOllyPage.ask(workout.plan_next_week_prompt);
            return await askOllyPage.waitForOllyResponse();
        });

        await allure.step(`[Step_3]: Verify workout assignments`, async () => {
            const workoutData = await fetchWorkoutAssignments('next_week');
            await verifyWorkoutOverviewByAI({userPrompt: workout.plan_next_week_prompt, ollyResponse: OllyResponse, workoutData});
        });
    });
    test('[@ask_olly_02] Ask Olly about the overview of current workout assignment plans @ask_olly', async ({ loginPage, page }) => {
        const askOllyPage = new AskOllyPage(page);
        const clientPage = new ClientPage(page);

        await allure.step(`[Step_1]: Open Ask Olly page`, async () => {
            await clientPage.openAskOllyPage();
        });

        const OllyResponse = await allure.step(`[Step_2]: Ask Olly a question about current workout assignments`, async () => {
            await askOllyPage.ask(workout.plan_this_week_prompt);
            return await askOllyPage.waitForOllyResponse();
        });

        await allure.step(`[Step_3]: Verify workout assignments`, async () => {
            const workoutData = await fetchWorkoutAssignments('this_week');
            await verifyWorkoutOverviewByAI({userPrompt: workout.plan_this_week_prompt, ollyResponse: OllyResponse, workoutData});
        });
    });
    test('[@ask_olly_03] Ask Olly about the overview of past workout assignment plans @ask_olly', async ({ loginPage, page }) => {
        const askOllyPage = new AskOllyPage(page);
        const clientPage = new ClientPage(page);

        await allure.step(`[Step_1]: Open Ask Olly page`, async () => {
            await clientPage.openAskOllyPage();
        });

        const OllyResponse = await allure.step(`[Step_2]: Ask Olly a question about past workout assignments`, async () => {
            await askOllyPage.ask(workout.plan_last_week_prompt);
            return await askOllyPage.waitForOllyResponse();
        });

        await allure.step(`[Step_3]: Verify workout assignments`, async () => {
            const workoutData = await fetchWorkoutAssignments('last_week');
            await verifyWorkoutOverviewByAI({userPrompt: workout.plan_last_week_prompt, ollyResponse: OllyResponse, workoutData});
        });
    });
});
