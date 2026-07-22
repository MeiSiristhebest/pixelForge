import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display landing page for unauthenticated users", async ({
    page,
  }) => {
    await page.goto("/");

    // Check hero section
    await expect(page.locator("h1")).toContainText("PixelForge");
    await expect(page.locator("text=AI-Powered Pixel Character Generator")).toBeVisible();

    // Check CTA buttons
    await expect(page.locator("text=Get Started Free")).toBeVisible();
    await expect(page.locator("text=Sign In")).toBeVisible();

    // Check features section
    await expect(page.locator("text=AI-Powered")).toBeVisible();
    await expect(page.locator("text=Sprite Sheets")).toBeVisible();
    await expect(page.locator("text=Real-time Preview")).toBeVisible();
  });

  test("should navigate to register page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Get Started Free");

    await expect(page).toHaveURL("/register");
    await expect(page.locator("h1")).toContainText("Create Account");
  });

  test("should navigate to login page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Sign In");

    await expect(page).toHaveURL("/login");
    await expect(page.locator("h1")).toContainText("Welcome Back");
  });
});

test.describe("Registration", () => {
  test("should show validation errors for invalid input", async ({ page }) => {
    await page.goto("/register");

    // Try to submit with empty form
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();

    // Fill email only
    await page.fill('input[id="email"]', "test@example.com");
    await expect(submitButton).toBeDisabled();

    // Fill username
    await page.fill('input[id="username"]', "testuser");
    await expect(submitButton).toBeDisabled();

    // Fill password
    await page.fill('input[id="password"]', "password123");
    await expect(submitButton).toBeDisabled();

    // Fill confirm password
    await page.fill('input[id="confirmPassword"]', "password123");
    await expect(submitButton).toBeEnabled();
  });

  test("should show error for password mismatch", async ({ page }) => {
    await page.goto("/register");

    await page.fill('input[id="email"]', "test@example.com");
    await page.fill('input[id="username"]', "testuser");
    await page.fill('input[id="password"]', "password123");
    await page.fill('input[id="confirmPassword"]', "differentpassword");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Passwords do not match")).toBeVisible();
  });
});

test.describe("Login", () => {
  test("should show validation errors", async ({ page }) => {
    await page.goto("/login");

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();

    await page.fill('input[id="username"]', "testuser");
    await expect(submitButton).toBeDisabled();

    await page.fill('input[id="password"]', "password");
    await expect(submitButton).toBeEnabled();
  });
});
