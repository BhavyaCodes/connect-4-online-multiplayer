import { useContext, useRef } from "react";
import { DispatchUserContext } from "../context/UserContext";
import { v4 } from "uuid";

export default function Login() {
  const iRef = useRef();
  const setUser = useContext(DispatchUserContext);
  function handleSubmit(e) {
    e.preventDefault();
    setUser({ id: v4(), name: iRef.current.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" required ref={iRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
