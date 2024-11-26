import { useSelector, useDispatch } from "react-redux";
import { voteAnecdotes } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ content, votes, handleClick }) => {
  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};
const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdotes(id));
    const votedAnecdote = anecdotes.find((a) => a.id === id);
    dispatch(setNotification(`You voted for ${votedAnecdote.content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const sortedAnecdotes = [...anecdotes].sort(
    (anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes
  );
  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => vote(anecdote.id)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
