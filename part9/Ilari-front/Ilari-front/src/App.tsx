import { useState, useEffect } from "react";

import { Diary } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createDiary({
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,
    })
      .then((data) => {
        setDiaries(diaries.concat(data));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
    setNewDate("");
    setNewVisibility("");
    setNewWeather("");
    setNewComment("");
  };
  return (
    <>
      <form onSubmit={diaryCreation}>
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "1em" }}>
            {errorMessage}
          </div>
        )}

        <h3>Add new entry</h3>
        <div>
          <label>
            date
            <input
              type="date"
              value={newDate}
              onChange={(event) => setNewDate(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            visibility great
            <input
              type="radio"
              name="visibility"
              onChange={() => setNewVisibility("great")}
            />
            good
            <input
              type="radio"
              name="visibility"
              onChange={() => setNewVisibility("good")}
            />
            ok
            <input
              type="radio"
              name="visibility"
              onChange={() => setNewVisibility("ok")}
            />
            poor
            <input
              type="radio"
              name="visibility"
              onChange={() => setNewVisibility("poor")}
            />
          </label>
        </div>
        <div>
          <label>
            weather
            <input
              value={newWeather}
              onChange={(event) => setNewWeather(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            comment
            <input
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
      <div>
        <h3>Diary Entries</h3>

        {diaries.map((diary) => (
          <div key={diary.id}>
            <h4>{diary.date}</h4>
            <div>{diary.visibility}</div>
            <div>{diary.weather}</div>
            <div>{diary.comment}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default App;
