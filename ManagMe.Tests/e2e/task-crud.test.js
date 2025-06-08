const puppeteer = require("puppeteer");

describe("Dodawanie, edytowanie i usuwanie nowego zadania", () => {
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

  it("Dodawanie nowego zadania", async () => {
    // dodanie projektu
    await page.click('[data-id="login-field"]');
    await page.type('[data-id="login-field"]', "admin");
    await page.click('[data-id="password-field"]');
    await page.type('[data-id="password-field"]', "admin123");
    await page.click('[data-id="login-button"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await page.click('[data-id="add-project-btn"]');

    await page.click('[data-id="new-project-name"]');
    await page.type('[data-id="new-project-name"]', "Projekt1");
    await page.click('[data-id="new-project-description"]');
    await page.type('[data-id="new-project-description"]', "Opis projektu 1");
    await page.click('[data-id="submit-project-btn"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await page.click('[data-id="select-project-btn"]');

    await page.click('[id="mat-tab-group-0-label-2"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.click('[data-id="new-task-btn"]');
    await page.click('[data-id="task-name"]');
    await page.type('[data-id="task-name"]', "Nowe zadanie");
    await page.click('[data-id="task-description"]');
    await page.type('[data-id="task-description"]', "Opis nowego zadania");
    const submitButton = await page.$('[data-id="submit-task-btn"]');
    await submitButton.evaluate((btn) => btn.scrollIntoView());
    await page.click('[data-id="submit-task-btn"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const taskDescription = await page.$('[data-task-name="Nowe zadanie"]');
    expect(taskDescription).toBeDefined();
  });

  // it("Edytowanie zadania", async () => {
  //   await page.click('[data-id="edit-story-btn"]');
  //   await page.click('[data-id="story-name"]');
  //   await page.keyboard.down("Control");
  //   await page.keyboard.press("KeyA");
  //   await page.keyboard.up("Control");
  //   await page.type('[data-id="story-name"]', "Inna nazwa historyjki");
  //   await page.click('[data-id="submit-story-btn"]');
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  //   const projectDescription = await page.$(
  //     '[data-story-name="Inna nazwa historyjki"]'
  //   );
  //   expect(projectDescription).toBeDefined();
  // });

  // it("Usuwanie zadania", async () => {
  //   await page.click('[data-id="delete-story-btn"]');
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  //   const projectDescription = await page.$(
  //     '[data-story-name="Inna nazwa historyjki"]'
  //   );
  //   expect(projectDescription).toBeNull();
  // });
});
