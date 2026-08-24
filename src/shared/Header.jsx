function Header({ token, onSetToken, onSetEmail }) {
    const handleLogOff = () => {
      onSetToken("");
      onSetEmail("");
    };
  
    return (
      <header>
        <h1>Todo List</h1>
  
        {token && (
          <button type="button" onClick={handleLogOff}>
            Log Off
          </button>
        )}
      </header>
    );
  }
  
  export default Header;