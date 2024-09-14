const Persons = ({ personsToShow, handleDelete }) =>
  personsToShow.map((person) => (
    <li key={person.id}>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </li>
  ));
export default Persons;
