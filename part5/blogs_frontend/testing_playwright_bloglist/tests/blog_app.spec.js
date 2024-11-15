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
      test.only("blogs are arranged by likes in descending order", async ({
        page,
      }) => {
        // Log in first
        await loginWith(page, "mluukkai", "salainen");

        // Create blogs with initial like counts
        await createBlog(page, "Blog A", "Author A", "http://example.com/a");
        await createBlog(page, "Blog B", "Author B", "http://example.com/b");
        await createBlog(page, "Blog C", "Author C", "http://example.com/c");
        const blogTitles = await page
          .locator(".briefDescription")
          .allTextContents();
        expect(blogTitles).toEqual([
          "Blog A Author Aview", // 3 likes
          "Blog B Author Bview", // 2 likes
          "Blog C Author Cview", // 1 like
        ]);
        // Open and increase likes for Blog B (3 likes)
        await page
          .locator(`.briefDescription:has-text("Blog B Author B")`)
          .getByText("view")
          .click();
        const blogBFull = page.locator(
          `.fullDescription:has-text("Blog B Author B")`
        );
        await blogBFull.getByRole("button", { name: "like" }).click();
        await blogBFull.getByRole("button", { name: "like" }).click();
        await blogBFull.getByRole("button", { name: "like" }).click();

        // Increase likes for Blog C (2 likes)
        await page
          .locator(`.briefDescription:has-text("Blog C Author C")`)
          .getByText("view")
          .click();
        const blogCFull = page.locator(
          `.fullDescription:has-text("Blog C Author C")`
        );
        await blogCFull.getByRole("button", { name: "like" }).click();
        await blogCFull.getByRole("button", { name: "like" }).click();

        // Refresh the page to re-check order after updating likes
        await page.reload();
        await expect(
          page.locator(`.briefDescription:has-text("Blog A Author A")`)
        ).toBeVisible();
        // Check that the blogs are ordered by likes in descending order
        const newBlogTitles = await page
          .locator(".briefDescription")
          .allTextContents();

        // Assert the order: Blog A should appear first, then Blog B, then Blog C
        expect(newBlogTitles).toEqual([
          "Blog B Author Bview", // 3 likes
          "Blog C Author Cview", // 2 likes
          "Blog A Author Aview", // 0 likes
        ]);
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
        test("can delete blog", async ({ page }) => {
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
        test("only user who added the blog sees the delete button", async ({
          page,
          request,
        }) => {
          //create another new user in the database
          await request.post("api/users", {
            data: {
              name: "Matti Luukkainen 2",
              username: "mluukkai2",
              password: "salainen2",
            },
          });
          // logout then
          await page.getByRole("button", { name: "logout" }).click();
          await expect(page.getByText("log in to application")).toBeVisible();
          // log back in as another user
          await loginWith(page, "mluukkai2", "salainen2");
          const testBlog1 = await page.locator(
            `.briefDescription:has-text("test title test author")`
          );
          await testBlog1.getByText("view").click();
          await expect(
            page.getByRole("button", {
              name: "remove",
            })
          ).not.toBeVisible();
        });
      });
    });
  });
});
