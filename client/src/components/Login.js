import { useContext, useRef } from "react";
import { DispatchUserContext } from "../context/UserContext";
import { v4 } from "uuid";
import { TextField, Box, Button, Container } from "@material-ui/core";

export default function Login() {
  const iRef = useRef();
  const setUser = useContext(DispatchUserContext);
  function handleSubmit(e) {
    e.preventDefault();
    setUser({ id: v4(), name: iRef.current.value });
  }

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" pt={4}>
        <form onSubmit={handleSubmit}>
          {/* <label>Name:</label> */}
          <TextField
            id="outlined-basic"
            label="Enter your name"
            variant="outlined"
            ref={iRef}
            required
          />
          <Box py={4}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
