import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useSocket } from "../context/SocketProvider";
import axios from "axios";

function Rooms() {
  const user = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const socket = useSocket();

  async function handleCreateRoom() {
    await axios.post("/api/room", user);
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

    return () => socket.off("receive-message");
  }, [socket]);

  return (
    <div>
      <p>Rooms</p>
      {rooms.map((room) => (
        <div key={room["0"].id}>{room["0"].name}</div>
      ))}
      <button onClick={handleCreateRoom} type="button">
        Create new room
      </button>
    </div>
  );
}

export default Rooms;
