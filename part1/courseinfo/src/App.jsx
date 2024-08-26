const Header = (props) => {
  console.log("header component ");
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  console.log(props);
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  console.log("content component");
  return (
    <div>
      <Part
        part={props.course.parts[0].name}
        exercise={props.course.parts[0].exercises}
      />
      <Part
        part={props.course.parts[1].name}
        exercise={props.course.parts[1].exercises}
      />
      <Part
        part={props.course.parts[2].name}
        exercise={props.course.parts[2].exercises}
      />
    </div>
  );
};

const Total = (props) => {
  console.log("part total component");
  return (
    <p>
      Number of exercises{" "}
      {props.course.parts[0].exercises +
        props.course.parts[1].exercises +
        props.course.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack appplication development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
