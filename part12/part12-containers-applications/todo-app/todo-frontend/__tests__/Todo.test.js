// __tests__/Todo.test.js
import React from "react";
import { render } from "@testing-library/react";
import Todo from "../src/Todos/Todo";

test("renders todo text", () => {
  const todo = { text: "Learn Docker" };
  const { getByText } = render(<Todo todo={todo} />);
  expect(getByText("Learn Docker")).toBeInTheDocument();
});
