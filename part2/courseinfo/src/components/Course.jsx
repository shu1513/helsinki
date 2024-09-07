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
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
