import { useState } from "react";

const Filter = ({ newSearch, handleSearchChange }) => (
  <div>
    filter shown with <input value={newSearch} onChange={handleSearchChange} />
  </div>
);
const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name:{" "}
      <input
        placeholder="enter name here"
        value={newName}
        onChange={handleNameChange}
      />
    </div>
    <div>
      number:{" "}
      <input
        placeholder="enter phone number here"
        value={newNumber}
        onChange={handleNumberChange}
        type="tel"
      />
    </div>

    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ personsToShow }) =>
  personsToShow.map((person, index) => (
    <li key={index}>
      {person.name} {person.number}
    </li>
  ));

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const personsToShow = !newSearch
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().startsWith(newSearch.toLowerCase())
      );

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
