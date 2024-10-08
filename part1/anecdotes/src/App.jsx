import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const points = Array(anecdotes.length).fill(0);
  const [votesArray, setVotesArray] = useState(points);
  const maxSelected = votesArray.indexOf(Math.max(...votesArray));

  const vote = (points, index) => {
    const copy = [...points];
    //add the points of the vote
    copy[index] += 1;
    //reset the array and render the page
    setVotesArray(copy);
  };

  return (
    <>
      <h3>Anecdoe of the day</h3>
      <div>{anecdotes[selected]}</div>
      <div>has {votesArray[selected]} votes</div>
      <Button text="vote" handleOnClick={() => vote(votesArray, selected)} />
      <Button
        text={"next anecdote"}
        handleOnClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      />
      <h3>Anecdoe with most votes</h3>
      <div>{anecdotes[maxSelected]}</div>
      <div>has {votesArray[maxSelected]} votes</div>
    </>
  );
};

const Button = ({ text, handleOnClick }) => {
  return <button onClick={handleOnClick}>{text}</button>;
};

export default App;
