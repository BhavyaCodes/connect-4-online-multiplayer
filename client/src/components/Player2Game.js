function Player2Game({ room }) {
  console.log(room);
  if (!room) {
    return <h1>Disconnected</h1>;
  }
  return (
    <div>
      <h1>Player 1 Game</h1>
      <h2>{room["0"]?.name}</h2>
      <h2>{room["1"]?.name}</h2>
    </div>
  );
}

export default Player2Game;
