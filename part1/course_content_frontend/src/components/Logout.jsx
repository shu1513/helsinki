const Logout = ({ text, setUser }) => {
  return (
    <p>
      <button
        onClick={() => {
          window.localStorage.removeItem("loggedNoteappUser");
          setUser(null);
        }}
      >
        {text}
      </button>
    </p>
  );
};

export default Logout;
