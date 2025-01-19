import "./App.css";

const App = () => {
  const courseName = "Half Stack application development!";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescriptions extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartDescriptions {
    kind: "basic";
  }
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartRequirements extends CoursePartDescriptions {
    requirements: string[];
    kind: "special";
  }

  interface CoursePartBackground extends CoursePartDescriptions {
    backgroundMaterial: string;
    kind: "background";
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartRequirements;

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

  interface ContentProps {
    list: CoursePart[];
  }

  const Content = (props: ContentProps) => {
    return (
      <>
        {props.list.map((item) => (
          <Part key={item.name} part={item} />
        ))}
      </>
    );
  };

  const Part = (props: { part: CoursePart }) => {
    switch (props.part.kind) {
      case "basic":
        return (
          <p>
            {props.part.name} {props.part.exerciseCount}{" "}
            {props.part.description}
          </p>
        );
      case "group":
        return (
          <p>
            {props.part.name} {props.part.exerciseCount}
            project exercises {props.part.groupProjectCount}
          </p>
        );
      case "background":
        return (
          <p>
            {props.part.name} {props.part.exerciseCount}
            {props.part.description} {props.part.backgroundMaterial}
          </p>
        );
      case "special":
        return (
          <p>
            {props.part.name} {props.part.exerciseCount}
            {props.part.description} required skills:{" "}
            {props.part.requirements.join(", ")}
          </p>
        );
      default:
        const _exhaustiveCheck: never = props.part;
        throw new Error(
          `unhandled union member: ${JSON.stringify(props.part)}`
        );
    }
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
