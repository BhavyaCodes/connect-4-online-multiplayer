import { useEffect } from "react";
import { Box } from "@material-ui/core";

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
    <Box py={4}>
      <Game />
    </Box>
  );
}

export default App;
