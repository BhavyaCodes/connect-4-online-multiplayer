import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useSocket } from "../context/SocketProvider";
import axios from "axios";
import Player1Game from "../components/Player1Game";
import Player2Game from "../components/Player2Game";

function Rooms() {
  const user = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const socket = useSocket();
  const [gameCreated, setGameCreated] = useState(null);
  const [gameJoined, setGameJoined] = useState(null);

  console.log(rooms);

  async function handleCreateRoom() {
    socket.emit("create-room", user);
    setGameCreated(true);
  }

  useEffect(() => {
    const getRooms = async () => {
      const rooms = (await axios.get("/api/rooms")).data;
      const arr = [];
      for (let key in rooms) {
        arr.push(rooms[key]);
      }
      setRooms(arr);
    };
    getRooms();
  }, []);

  useEffect(() => {
    if (socket == null) return;

    socket.on("room-created", (rooms) => {
      console.log(rooms);
      const arr = [];
      for (let key in rooms) {
        arr.push(rooms[key]);
      }
      setRooms(arr);
    });

    return () => socket.off("room-created");
  }, [socket]);

  function handleJoinRoom(roomId) {
    setGameJoined(roomId);
    socket.emit("join-room", roomId, user);
  }
  if (gameJoined) {
    const index = rooms.findIndex((value) => value["0"].id === gameJoined);
    return <Player2Game room={rooms[index]} />;
  }

  if (gameCreated) {
    const index = rooms.findIndex((value) => value["0"].id === user.id);
    return <Player1Game room={rooms[index]} />;
  }

  return (
    <div>
      <p>Rooms</p>
      {rooms.map((room) => (
        <div key={room["0"].id}>
          <p>{room["0"].name}</p>
          {room["1"] ? (
            <p>Game in progress</p>
          ) : (
            user.id !== room["0"].id && (
              <button
                type="button"
                onClick={() => {
                  handleJoinRoom(room["0"].id);
                }}
              >
                Join
              </button>
            )
          )}
        </div>
      ))}
      <button onClick={handleCreateRoom} type="button">
        Create new room
      </button>
    </div>
  );
}

export default Rooms;
