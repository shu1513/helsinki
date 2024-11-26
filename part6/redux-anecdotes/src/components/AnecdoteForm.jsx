import { addAnecdotes } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = ({ text }) => {
  const dispatch = useDispatch();

  const newAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdotes(content));
    dispatch(setNotification(`you added: ${content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
  return (
    <>
      <h2>{text}</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
