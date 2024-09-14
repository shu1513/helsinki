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
export default PersonForm;
