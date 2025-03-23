import Counter from "./components/Counter";

function App() {
  return (
    <>
      <Counter>{(num: number) => <>Current Count: {num}</>}</Counter>
    </>
  );
}

export default App;
