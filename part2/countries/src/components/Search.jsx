const Search = ({ newSearch, handleSearchChange }) => (
    <div>
      find countries <input value={newSearch} onChange={handleSearchChange} />
    </div>
  );
  export default Search;