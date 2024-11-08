import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  const mockUpdateHandler = vi.fn();
  const mockDeleteHandler = vi.fn();
  beforeEach(() => {
    const user = { name: "test user" };
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    const blog = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 5,
      id: "6709d7bd885ea90e3a63c63f",
    };

    container = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateHandler}
        deleteBlog={mockDeleteHandler}
      />
    ).container;
  });

  test("renders title and author", async () => {
    const elements = await screen.findAllByText("test title test author", {
      exact: false,
    });

    window.localStorage.removeItem("loggedBlogappUser");
  });

  test("at the start does not display url or likes", () => {
    const div = container.querySelector(".fullDescription");
    expect(div).toHaveStyle("display: none");
  });
  test("at the start it shows title and author", () => {
    const div = container.querySelector(".briefDescription");
    expect(div).not.toHaveStyle("display: none");
  });
  test("after lcicking button, url and likes are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".fullDescription");
    expect(div).not.toHaveStyle("display: none");
  });
  test("like button calls handler twice after being clicked twice", async () => {
    const user = userEvent.setup();
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockUpdateHandler.mock.calls).toHaveLength(2);
  });
});
