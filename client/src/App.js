import { useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  useEffect(() => {
    const test = async () => {
      const response = await axios.get("/api/ping");
      console.log(response);
    };
    test();
  }, []);
  return <div className="App">App</div>;
}

export default App;
