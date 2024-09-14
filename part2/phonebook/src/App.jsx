import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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

  const isPersonDuplicate = (name, number) => {
    return persons.some(
      (person) => person.name === name && person.number === number
    );
  };

  const isNumberDifferent = (name, number) => {
    return persons.some(
      (person) => person.name === name && person.number !== number
    );
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (isPersonDuplicate(newName, newNumber)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (isNumberDifferent(newName, newNumber)) {
      const foundPerson = persons.find((person) => person.name === newName);
      if (window.confirm(`Replace ${foundPerson.name}'s number?`)) {
        const updatedPerson = { ...foundPerson, number: newNumber };
        personService.update(updatedPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
        });
      }
      return;
    }
    createNewPerson();
  };

  const createNewPerson = () => {
    const newPerson = { name: newName, number: newNumber };
    personService.create(newPerson).then((addedPerson) => {
      setPersons(persons.concat(addedPerson));
      setNewName("");
      setNewNumber("");
    });
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
