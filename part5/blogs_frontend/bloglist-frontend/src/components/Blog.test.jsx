import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
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
      <Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}} />
    ).container;
    screen.debug();
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
});
