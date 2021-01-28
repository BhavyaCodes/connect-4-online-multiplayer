import React from "react";

function Player1Game({ room }) {
  console.log(room);
  return (
    <div>
      <h1>Player 1 Game</h1>
      <h2>{room["0"]?.name}</h2>
      <h2>{room["1"]?.name}</h2>
    </div>
  );
}

export default Player1Game;
