import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h3>Give feedback</h3>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <h3>statistics</h3>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>
        average
        {good + neutral + bad ? (good - bad) / (good + neutral + bad) : 0}
      </div>
      <div>
        positive{" "}
        {good + neutral + bad ? (good / (good + neutral + bad)) * 100 : 0} %
      </div>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
export default App;
