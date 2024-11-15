const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "log in" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createNote = async (page, content) => {
  await page.getByRole("button", { name: "new note" }).click();
  await page.getByTestId("newNote").fill(content);
  await page.getByRole("button", { name: "save" }).click();
  // Wait for the note to appear on the page by checking for its content in the list
  await page.getByText(content).waitFor();
};

export { loginWith, createNote };
