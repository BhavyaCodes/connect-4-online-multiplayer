import React, { useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

const style = makeStyles((theme) => ({
  root: { paddingTop: 100, background: "#4dcbff" },
  board: {
    background: "linear-gradient(#3ca3ff, #005eb3)",
    width: 800,
    margin: "auto",
  },
  cell: {
    width: 800 / 7 - 8,
    height: 800 / 7 - 8,
    background: "white",
    display: "inline-block",
    boxSizing: "border-box",
    borderRadius: "50%",
    margin: 4,
    cursor: "pointer",
  },
}));

const Player = {
  None: null,
  One: 1,
  Two: 2,
};

const boardInitializer = () => {
  const board = [];
  for (let index = 0; index < 42; index++) {
    board.push(Player.None);
  }
  return board;
};

export default function Game() {
  const classes = style();

  const [board, setBoard] = useState(boardInitializer);

  const boardCells = () => {
    return board.map((player, index) => renderCell(player, index));
  };

  const renderCell = (player, index) => {
    return <Box className={classes.cell} key={index}></Box>;
  };

  return <Box className={classes.board}>{boardCells()}</Box>;
}
