import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useSocket } from "../context/SocketProvider";
import axios from "axios";
import { Container, Box, Button, Typography } from "@material-ui/core";
import Player1Game from "../components/Player1Game";
import Player2Game from "../components/Player2Game";

function Rooms() {
  const user = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const socket = useSocket();
  const [gameCreated, setGameCreated] = useState(null);
  const [gameJoined, setGameJoined] = useState(null);

  async function handleCreateRoom() {
    socket.emit("create-room", user);
    setGameCreated(true);
  }

  useEffect(() => {
    const getRooms = async () => {
      const rooms = (
        await axios.get(`${process.env.REACT_APP_API_URL}/api/rooms`)
      ).data;
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
      const arr = [];
      for (let key in rooms) {
        arr.push(rooms[key]);
      }
      setRooms(arr);
    });

    return () => socket.off("room-created");
  }, [socket]);

  function closeRoom() {
    console.log("close-room");
    socket.emit("close-room");
  }

  function handleJoinRoom(roomId) {
    setGameJoined(roomId);
    socket.emit("join-room", roomId, user);
  }
  if (gameJoined) {
    const index = rooms.findIndex((value) => value["0"].id === gameJoined);
    return <Player2Game room={rooms[index]} setGameJoined={setGameJoined} />;
  }

  if (gameCreated) {
    const index = rooms.findIndex((value) => value["0"].id === user.id);
    return (
      <Player1Game
        room={rooms[index]}
        closeRoom={closeRoom}
        setGameCreated={setGameCreated}
      />
    );
  }

  return (
    <Container maxWidth="xs">
      <Box textAlign="center" pt={4}>
        <Typography variant="h2">Rooms</Typography>
        {rooms.map((room) => (
          <div key={room["0"].id}>
            <Box py={2}>
              <Typography variant="h5">
                😃 {room["0"].name}'s Ready to play..
              </Typography>
            </Box>
            {room["1"] ? (
              <Typography variant="h6">Game in progress</Typography>
            ) : (
              user.id !== room["0"].id && (
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => {
                    handleJoinRoom(room["0"].id);
                  }}
                >
                  Join
                </Button>
              )
            )}
          </div>
        ))}
        <Box py={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateRoom}
            type="button"
          >
            Create new room
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Rooms;
