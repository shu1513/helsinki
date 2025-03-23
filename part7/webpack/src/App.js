import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PromisePolyfill from "promise-polyfill";

if (!window.Promise) {
  window.Promise = PromisePolyfill;
}

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then(
      (response) => {
        setNotes(response.data);
      },
      [url]
    );
    return notes;
  });
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const url = "https://notes2023.fly.dev/api/notes";
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter((counter) => counter + 1);
    setValues((values) => values.concat(counter));
  };

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      <div>
        {notes.legth} notes on server {BACKEND_URL}
      </div>
    </div>
  );
};

export default App;
