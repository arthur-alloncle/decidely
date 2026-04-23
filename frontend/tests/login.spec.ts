import { test, expect, type Page } from "@playwright/test";

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Mock
 */
async function mockLoginSuccess(page: Page): Promise<void> {
  await page.route("**/login", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ status: 200, message: "Connexion réussie" }),
    })
  );
}

async function mockLoginFailure(page: Page): Promise<void> {
  await page.route("**/login", (route) =>
    route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({
        status: 401,
        message: "Identifiants invalides",
      }),
    })
  );
}

/**
 * Fill & submit forms
 */
async function fillAndSubmit(page: Page): Promise<void> {
  await page.getByLabel("Adresse email").fill("sophie.durand@test.com");
  await page.getByLabel("Mot de passe").fill("password123");
  await page.getByRole("button", { name: "Se connecter" }).click();
}


test.describe("Page de Login - Affichage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");
  });

  // ─── Form display tests ───────────────────────────────────────────────────

  test("affiche correctement les champs du formulaire", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
    await expect(page.getByLabel("Adresse email")).toBeVisible();
    await expect(page.getByLabel("Mot de passe")).toBeVisible();
    await expect(page.getByRole("button", { name: "Se connecter" })).toBeVisible();
  });

  test("le bouton login est désactivé si les champs sont vides", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: "Se connecter" })).toBeDisabled();
  });

  test("le bouton login est désactivé si seulement l'email est rempli", async ({
    page,
  }) => {
    await page.getByLabel("Adresse email").fill("sophie.durand@test.com");
    await expect(page.getByRole("button", { name: "Se connecter" })).toBeDisabled();
  });

  test("le bouton login est désactivé si seulement le mot de passe est rempli", async ({
    page,
  }) => {
    await page.getByLabel("Mot de passe").fill("password123");
    await expect(page.getByRole("button", { name: "Se connecter" })).toBeDisabled();
  });
});

// ─── Mocked API tests ───────────────────────────────────────────────────

test.describe("Page de Login — API mockée", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");
  });

  test("connexion réussie (mock 200) → redirection vers /decisions", async ({
    page,
  }) => {
    await mockLoginSuccess(page);
    await fillAndSubmit(page);

    await page.waitForURL("http://localhost:5173/decisions");
    expect(page.url()).toBe("http://localhost:5173/decisions");
  });

  test("la page /decisions contient les 3 sections attendues (mock 200)", async ({
    page,
  }) => {
    await mockLoginSuccess(page);
    await fillAndSubmit(page);

    await page.waitForURL("http://localhost:5173/decisions");

    await expect(
      page.getByRole("heading", { level: 1, name: "Créer une décision" })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 1, name: "Liste des décisions" })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 1, name: "Statistiques" })
    ).toBeVisible();

    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(3);
  });

  test("échec de connexion (mock 401) → pas de redirection", async ({
    page,
  }) => {
    await mockLoginFailure(page);
    await fillAndSubmit(page);

    // L'URL shouldn't change
    expect(page.url()).toBe("http://localhost:5173/login");
  });

  test("échec de connexion (mock 401) → affiche un toast d'erreur", async ({
    page,
  }) => {
    await mockLoginFailure(page);
    await fillAndSubmit(page);

    // PrimeReact Toast - severity "error"
    await expect(page.locator(".p-toast-message-error")).toBeVisible();
  });

  test("l'appel API transmet bien email et password dans le body", async ({
    page,
  }) => {
    let requestBody: Record<string, string> = {};

    await page.route("**/login", async (route) => {
      requestBody = JSON.parse(route.request().postData() ?? "{}");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: 200, message: "Connexion réussie" }),
      });
    });

    await fillAndSubmit(page);

    expect(requestBody.email).toBe("sophie.durand@test.com");
    expect(requestBody.password).toBe("password123");
  });
});