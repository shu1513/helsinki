const Header = ({ courseName }) => <h3>{courseName}</h3>;

const Total = ({ parts }) => {
  const getSum = (total, part) => total + part.exercises;
  const sum = parts.reduce(getSum, 0);
  return (
    <p>
      <b>Total of {sum} exercises</b>
    </p>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </>
  );
};

const Course = ({ course }) => {
  console.log("Course works for return before map");
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
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
