import { useEffect } from "react";
import { Box } from "@material-ui/core";

import axios from "axios";

import Game from "./game";

function App() {
  useEffect(() => {
    const test = async () => {
      const response = await axios.get("/api/ping");
      console.log(response);
    };
    test();
  }, []);
  return (
    <Box py={6}>
      <Game />
    </Box>
  );
}

export default App;
