const Logout = ({ text, setUser }) => {
  return (
    <p>
      <button
        onClick={() => {
          window.localStorage.clear();
          setUser(null);
        }}
      >
        {text}
      </button>
    </p>
  );
};

export default Logout;
