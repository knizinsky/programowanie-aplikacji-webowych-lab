const puppeteer = require("puppeteer");

describe("Dodawanie, edytowanie i usuwanie nowego projektu", () => {
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

  it("Dodawanie, edytowanie i usuwanie nowego projektu", async () => {
    await page.click('[data-id="login-field"]');
    await page.type('[data-id="login-field"]', "admin");
    await page.click('[data-id="password-field"]');
    await page.type('[data-id="password-field"]', "admin123");
    await page.click('[data-id="login-button"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await page.click('[data-id="add-project-btn"]');

    await page.click('[data-id="new-project-name"]');
    await page.type('[data-id="new-project-name"]', "Nowy projekt");
    await page.click('[data-id="new-project-description"]');
    await page.type(
      '[data-id="new-project-description"]',
      "Opis nowego projektu"
    );
    await page.click('[data-id="submit-project-btn"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const projectDescription = await page.$(
      '[data-project-description="Opis nowego projektu"]'
    );
    expect(projectDescription).toBeDefined();
  });

  it("Edytowanie projektu", async () => {
    await page.click('[data-id="edit-project-btn"]');
    await page.click('[data-id="new-project-description"]');
    await page.keyboard.down("Control");
    await page.keyboard.press("KeyA");
    await page.keyboard.up("Control");
    await page.type(
      '[data-id="new-project-description"]',
      "Nowy opis projektu"
    );
    await page.click('[data-id="submit-project-btn"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const projectDescription = await page.$(
      '[data-project-description="Nowy opis projektu"]'
    );
    expect(projectDescription).toBeDefined();
  });

  it("Usuwanie projektu", async () => {
    await page.click('[data-id="delete-project-btn"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const projectDescription = await page.$(
      '[data-project-description="Nowy opis projektu"]'
    );
    expect(projectDescription).toBeNull();
  });
});
