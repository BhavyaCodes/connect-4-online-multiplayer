import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Login from "./Login";

function Rooms() {
  const user = useContext(UserContext);
  console.log(user);
  if (!user.id) {
    return <Login />;
  }
  return (
    <div>
      <p>Rooms</p>
    </div>
  );
}

export default Rooms;
