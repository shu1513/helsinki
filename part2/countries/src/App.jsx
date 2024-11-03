import { useState } from "react";
import Search from "./components/Search";
import Display from "./components/Display";

const App = () => {
  const [newSearch, setNewSearch] = useState("");

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };
  return (
    <div>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Display countrySearch={newSearch} />
    </div>
  );
};

export default App;
