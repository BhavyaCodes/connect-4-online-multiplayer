import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";

import "./game.css";

const Player = {
  None: null,
  One: 1,
  Two: 2,
};

const GameState = {
  Ongoing: -1,
  Draw: 0,
  PlayerOneWin: Player.One,
  PlayerTwoWin: Player.Two,
};

const intitializeBoard = () => {
  const board = [];
  for (let i = 0; i < 42; i++) {
    board.push(Player.None);
  }
  return board;
};

const getPrettyPlayer = (player) => {
  if (player === Player.None) return "noPlayer";
  if (player === Player.One) return "playerOne";
  if (player === Player.Two) return "playerTwo";
};

const findLowestEmptyIndex = (board, column) => {
  for (let i = 35 + column; i >= 0; i -= 7) {
    if (board[i] === Player.None) return i;
  }

  return -1;
};

const togglePlayerTurn = (player) => {
  return player === Player.One ? Player.Two : Player.One;
};

const getGameState = (board) => {
  // Checks wins horizontally
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c <= 4; c++) {
      const index = r * 7 + c;
      const boardSlice = board.slice(index, index + 4);

      const winningResult = checkWinningSlice(boardSlice);
      if (winningResult !== false) return winningResult;
    }
  }

  // check wins vertically
  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c < 7; c++) {
      const index = r * 7 + c;
      const boardSlice = [
        board[index],
        board[index + 7],
        board[index + 7 * 2],
        board[index + 7 * 3],
      ];

      const winningResult = checkWinningSlice(boardSlice);
      if (winningResult !== false) return winningResult;
    }
  }

  // check wins diagonally
  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c < 7; c++) {
      const index = r * 7 + c;

      // Checks diagonal down-left
      if (c >= 3) {
        const boardSlice = [
          board[index],
          board[index + 7 - 1],
          board[index + 7 * 2 - 2],
          board[index + 7 * 3 - 3],
        ];

        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) return winningResult;
      }

      // Checks diagonal down-right
      if (c <= 3) {
        const boardSlice = [
          board[index],
          board[index + 7 + 1],
          board[index + 7 * 2 + 2],
          board[index + 7 * 3 + 3],
        ];

        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) return winningResult;
      }
    }
  }

  if (board.some((cell) => cell === Player.None)) {
    return GameState.Ongoing;
  } else {
    return GameState.Draw;
  }
};

const checkWinningSlice = (miniBoard) => {
  if (miniBoard.some((cell) => cell === Player.None)) return false;

  if (
    miniBoard[0] === miniBoard[1] &&
    miniBoard[1] === miniBoard[2] &&
    miniBoard[2] === miniBoard[3]
  ) {
    return miniBoard[1];
  }

  return false;
};

export default function Game() {
  const [board, setBoard] = useState(intitializeBoard());
  const [playerTurn, setPlayerTurn] = useState(Player.One);
  const [gameState, setGameState] = useState(GameState.Ongoing);

  const renderCells = () => {
    return board.map((player, index) => renderCell(player, index));
  };

  const handleOnClick = (index) => () => {
    if (gameState !== GameState.Ongoing) return;

    const column = index % 7;

    makeMove(column);
  };

  const makeMove = (column) => {
    const index = findLowestEmptyIndex(board, column);

    const newBoard = board.slice();
    newBoard[index] = playerTurn;

    const gameState = getGameState(newBoard);

    setBoard(newBoard);
    setPlayerTurn(togglePlayerTurn(playerTurn));
    setGameState(gameState);
  };

  const renderCell = (player, index) => {
    return (
      <Box
        className="cell"
        key={index}
        onClick={handleOnClick(index)}
        data-player={getPrettyPlayer(player)}
      />
    );
  };

  const renderGameStatus = () => {
    let text;
    if (gameState === GameState.Ongoing) {
      text = "Game is in progress...";
    } else if (gameState === GameState.Draw) {
      text = "Game is a draw.";
    } else if (gameState === GameState.PlayerOneWin) {
      text = "Player 1 won!";
    } else if (gameState === GameState.PlayerTwoWin) {
      text = "Player 2 won!";
    }

    return (
      <Typography variant="h3" align="center" mb={1}>
        {text}
      </Typography>
    );
  };

  return (
    <Box>
      {renderGameStatus()}
      <Box className="board" my={2}>
        {renderCells()}
      </Box>
      {gameState === GameState.Ongoing ? (
        <Typography variant="h3" align="center">
          Player {playerTurn}'s Turn
        </Typography>
      ) : null}
    </Box>
  );
}
