import { useEffect } from "react";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import axios from "axios";

import Game from "./game";

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
    <Switch>
      <Route path="/" exact>
        hello
      </Route>
      <Route path="/game">
        <Box py={4}>
          <Game />
        </Box>
      </Route>
    </Switch>
  );
}

export default App;
