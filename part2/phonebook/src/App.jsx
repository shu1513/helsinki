import { useState, useEffect } from "react";
import personService from "./services/persons";

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

const Persons = ({ personsToShow, handleDelete }) =>
  personsToShow.map((person) => (
    <li key={person.id}>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </li>
  ));

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    console.log("using effect to fetch persons data");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
      personService.create(newPerson).then((addedPerson) => {
        console.log(`${addedPerson.name} created successfully`);
        setPersons(persons.concat(addedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = (id) => {
    const persontoDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${persontoDelete.name} ?`)) {
      personService
        .deletePerson(id)
        .then((deletedPerson) => {
          console.log(`sucsesfully deleted ${deletedPerson.name}`);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          alert`the person${persontoDelete.name} has already been deleted`;
          setPersons(persons.filter((person) => person.id !== id));
        });
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
