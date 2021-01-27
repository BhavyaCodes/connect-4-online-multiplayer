import { useEffect } from "react";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import axios from "axios";

import { UserProvider } from "./context/UserContext";
import Game from "./game";
import Rooms from "./components/Rooms";

import "./App.css";

function App() {
  useEffect(() => {
    const test = async () => {
      const response = await axios.get("/api/ping");
      console.log(response);
    };
    test();
  }, []);

  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default App;
