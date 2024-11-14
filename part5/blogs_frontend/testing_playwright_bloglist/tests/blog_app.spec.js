const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("api/testing/reset");
    await request.post("api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("/");
  });
  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("log in to application");
    await expect(locator).toBeVisible();
  });
  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();
  });
  describe("login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
      await expect(
        page.getByText("Matti Luukkainen is logged in")
      ).toBeVisible();
    });
    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "wrong password");

      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("Wrong credentials");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(
        page.getByText("Matti Luukkainen is logged in")
      ).not.toBeVisible();
    });
    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, "mluukkai", "salainen");
      });
      test("a new blog can be created", async ({ page }) => {
        await createBlog(page, "test title", "test author", "test url");
        await expect(
          page.getByText(`a new blog test title by test author added`)
        ).toBeVisible();
        await expect(
          page.locator(`.briefDescription:has-text("test title test author")`)
        ).toBeVisible();
      });
      describe("when logged in with exiting notes", () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, "test title", "test author", "test url");
          await createBlog(page, "test title 2", "test author 2", "test url 2");
        });
        test("a blog can be liked", async ({ page }) => {
          const testBlog1 = await page.locator(
            `.briefDescription:has-text("test title test author")`
          );
          await testBlog1.getByText("view").click();
          const testBlog1Full = page.locator(
            `.fullDescription:has-text("test title test author")`
          );
          await expect(testBlog1Full).toBeVisible();
          await expect(testBlog1Full.getByText("likes 0 ")).toBeVisible();
          await testBlog1Full.getByRole("button", { name: "like" }).click();
          await expect(testBlog1Full.getByText("likes 0 ")).not.toBeVisible();
          await expect(testBlog1Full.getByText("likes 1 ")).toBeVisible();
        });
        test.only("can delete blog", async ({ page }) => {
          const testBlog1 = await page.locator(
            `.briefDescription:has-text("test title test author")`
          );
          await testBlog1.getByText("view").click();
          const testBlog1Full = page.locator(
            `.fullDescription:has-text("test title test author")`
          );
          await expect(testBlog1Full).toBeVisible();
          await page.on("dialog", async (dialog) => {
            if (dialog.type() === "confirm") {
              await dialog.accept();
            }
          });
          await testBlog1Full.getByRole("button", { name: "remove" }).click();
          await expect(
            page.getByText("The blog test title by test author has be deleted.")
          ).toBeVisible();

          await expect(
            page
              .locator(".briefDescription")
              .getByText("test title test author")
          ).not.toBeVisible();
        });
      });
    });
  });
});
