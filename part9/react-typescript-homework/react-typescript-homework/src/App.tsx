import "./App.css";

const App = () => {
  const courseName = "Half Stack application development!";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 14,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  interface HeaderProps {
    name: string;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  };

  interface TotalProps {
    total: number;
  }

  const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.total}</p>;
  };

  interface ContentPropsItem {
    name: string;
    exerciseCount: number;
  }

  interface ContentProps {
    list: ContentPropsItem[];
  }

  const Content = (props: ContentProps) => {
    return (
      <>
        {props.list.map((item) => (
          <p key={item.name}>
            {item.name} {item.exerciseCount}
          </p>
        ))}
      </>
    );
  };

  return (
    <div>
      <Header name={courseName} />
      <Content list={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};
export default App;
