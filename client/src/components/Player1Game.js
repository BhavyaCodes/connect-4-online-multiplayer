import { useSocket } from "../context/SocketProvider";

function Player1Game({ room }) {
  const socket = useSocket();
  console.log(room);
  if (!room) {
    return <h1>Disconnected</h1>;
  }
  return (
    <div>
      <h1>Player 1 Game</h1>
      <h2>{room["0"]?.name}</h2>
      <h2>{room["1"]?.name || "waiting for player 2"}</h2>
    </div>
  );
}

export default Player1Game;
