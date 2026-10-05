const { Builder, By } = require('selenium-webdriver');

describe('Home Page E2E Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444')
            .build();
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('should display the correct heading', async () => {
        await driver.get(
            process.env.APP_URL || 'http://host.docker.internal:3000'
        );

        const heading = await driver.findElement(By.css('h1'));
        const text = await heading.getText();

        expect(text).toBe('Hello DevOps');
    });
});