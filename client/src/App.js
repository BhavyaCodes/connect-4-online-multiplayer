import { useEffect } from "react";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import axios from "axios";

import { UserProvider, DispatchUserContext } from "./context/UserContext";
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
      <DispatchUserContext>
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
      </DispatchUserContext>
    </UserProvider>
  );
}

export default App;
