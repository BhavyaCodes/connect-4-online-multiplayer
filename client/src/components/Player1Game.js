import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

function Player1Game({ room }) {
  const socket = useSocket();
  const [state, setState] = useState({ tae: "tae" });
  console.log(room);

  useEffect(() => {
    if (socket == null) return;

    socket.on("turn", (state) => {
      console.log(state);
    });

    return () => socket.off("turn");
  }, [socket]);

  if (!room) {
    return <h1>Disconnected</h1>;
  }

  return (
    <div>
      <h1>Player 1 Game</h1>
      <h2>{room["0"]?.name}</h2>
      <h2>{room["1"]?.name || "waiting for player 2"}</h2>
      <button
        onClick={() => {
          socket.emit("send-turn", room["0"].id, state);
        }}
      >
        Test
      </button>
    </div>
  );
}

export default Player1Game;
