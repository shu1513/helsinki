import { render, screen } from "@testing-library/react";
import NewBlog from "./NewBlog";
import userEvent from "@testing-library/user-event";

test("<NewBlog /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<NewBlog createBlog={createBlog} />);

  const titleInput = container.querySelector("#title-input");
  const authorInput = container.querySelector("#author-input");
  const urlInput = container.querySelector("#url-input");
  const createButton = screen.getByText("create");

  await user.type(titleInput, "testing title input");
  await user.type(authorInput, "testing author input");
  await user.type(urlInput, "testing url input");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  console.log(createBlog.mock.calls);
  expect(createBlog.mock.calls[0][0].title).toBe("testing title input");
  expect(createBlog.mock.calls[0][0].author).toBe("testing author input");
  expect(createBlog.mock.calls[0][0].url).toBe("testing url input");
});
