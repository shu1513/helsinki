import deepFreeze from "deep-freeze";
import AnecdoteReducer from "./anecdoteReducer";

describe("test anecdote reducer", () => {
  test("return new stsate with ADD", () => {
    const state = [];
    const action = {
      type: "ADD",
      payload: {
        content: "sample anecdote",
      },
    };
    deepFreeze(state);
    const newState = AnecdoteReducer(state, action);
    expect(newState).toHaveLength(1);
    expect(newState).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ content: action.payload.content }),
      ])
    );
  });
});
