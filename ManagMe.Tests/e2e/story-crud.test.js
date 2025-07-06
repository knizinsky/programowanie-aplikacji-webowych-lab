const puppeteer = require("puppeteer");

describe("Dodawanie, edytowanie i usuwanie nowej historyjki", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 10 });
    page = await browser.newPage();
    await page.goto("http://localhost:4200");
  });

  afterAll(async () => {
    await browser.close();
  });

  it("Dodawanie nowej historyjki", async () => {
    // dodanie projektu
    await page.click('[data-id="login-field"]');
    await page.type('[data-id="login-field"]', "admin");
    await page.click('[data-id="password-field"]');
    await page.type('[data-id="password-field"]', "admin123");
    await page.click('[data-id="login-button"]');
    await page.waitForSelector('[data-id="add-project-btn"]');
    await page.click('[data-id="add-project-btn"]');

    await page.click('[data-id="new-project-name"]');
    await page.type('[data-id="new-project-name"]', "Projekt1");
    await page.click('[data-id="new-project-description"]');
    await page.type('[data-id="new-project-description"]', "Opis projektu 1");
    await page.click('[data-id="submit-project-btn"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.click('[data-id="select-project-btn"]');
    await page.click('[id="mat-tab-group-0-label-1"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.click('[data-id="add-story-btn"]');
    await page.click('[data-id="story-name"]');
    await page.type('[data-id="story-name"]', "Nowa historyjka");

    await page.click('[data-id="story-description"]');
    await page.type('[data-id="story-description"]', "Opis nowej historyjki");
    await page.click('[data-id="submit-story-btn"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const projectDescription = await page.$(
      '[data-story-name="Nowa historyjka"]'
    );
    expect(projectDescription).toBeDefined();
  });

  it("Edytowanie historyjki", async () => {
    await page.click('[data-id="edit-story-btn"]');
    await page.click('[data-id="story-name"]');
    await page.keyboard.down("Control");
    await page.keyboard.press("KeyA");
    await page.keyboard.up("Control");
    await page.type('[data-id="story-name"]', "Inna nazwa historyjki");
    await page.click('[data-id="submit-story-btn"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const projectDescription = await page.$(
      '[data-story-name="Inna nazwa historyjki"]'
    );
    expect(projectDescription).toBeDefined();
  });

  it("Usuwanie historyjki", async () => {
    await page.click('[data-id="delete-story-btn"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const projectDescription = await page.$(
      '[data-story-name="Inna nazwa historyjki"]'
    );
    expect(projectDescription).toBeNull();
  });
});
