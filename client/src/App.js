import { useContext } from "react";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import { UserContext } from "./context/UserContext";
import Game from "./game";
import Rooms from "./components/Rooms";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  const user = useContext(UserContext);

  if (!user.id) {
    return <Login />;
  }

  return (
    <SocketProvider id={user.id}>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Rooms />
        </Route>
        <Route path="/game">
          <Box py={4}>
            <Game />
          </Box>
        </Route>
      </Switch>
    </SocketProvider>
  );
}

export default App;
