// src/Todos/Todo.js
import React from "react";

const Todo = ({ todo }) => {
  return (
    <div>
      <p>{todo.text}</p> {/* Ensure the text is displayed */}
    </div>
  );
};

export default Todo;
