function Lobby() {
  return (
    <div className="lobby">
      <h1>Lobby</h1>
      <form hx-post="/joingame" hx-target="body">
        <input type="text" placeholder="Username" />
        <button>Join Game</button>
      </form>
    </div>
  );
}

export default Lobby;
