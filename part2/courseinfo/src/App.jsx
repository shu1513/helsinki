const Header = ({ courseName }) => <h3>{courseName}</h3>;

const Total = ({ sum }) => (
  <p>
    <b>Total of {sum} exercises</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  let sum = 0;
  return (
    <>
      {parts.map((part) => {
        sum += part.exercises;
        return <Part key={part.id} part={part} />;
      })}
      <Total sum={sum} />
    </>
  );
};

const Course = ({ course }) => {
  console.log("Course works for return before map");
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const App = () => {
  console.log("app is loaded");
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
