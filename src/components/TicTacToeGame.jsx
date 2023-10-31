// import { useReducer } from "react";
import styled from "styled-components";
import { useState } from "react";
import GameResultModal from "./GameResultModal";

const TicTacToeGame = () => {
  const [activePlayer, setActivePlayer] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [finish, setfinish] = useState(false);

  const switchPlayer = () => {
    setActivePlayer((act) => (act === "X" ? "O" : "X"));
  };
  const changeValueHandler = (index) => {
    if (squares[index]) return;
    const newSquares = squares.slice();

    newSquares[index] = activePlayer;
    setSquares(newSquares);

    switchPlayer();
  };

  if (
    squares[0] !== null &&
    squares[0] == squares[1] &&
    squares[1] == squares[2]
  ) {
    console.log(1);
    setfinish(true);
  } else if (
    squares[3] !== null &&
    squares[3] == squares[4] &&
    squares[4] == squares[5]
  ) {
    console.log(2);
  } else if (
    squares[6] !== null &&
    squares[6] == squares[7] &&
    squares[7] == squares[8]
  ) {
    console.log(3);
  } else if (
    squares[0] !== null &&
    squares[0] == squares[3] &&
    squares[3] == squares[6]
  ) {
    console.log(4);
  } else if (
    squares[1] !== null &&
    squares[1] == squares[4] &&
    squares[4] == squares[7]
  ) {
    console.log(5);
  } else if (
    squares[2] !== null &&
    squares[2] == squares[5] &&
    squares[5] == squares[8]
  ) {
    console.log(6);
  }

  return (
    <>
      <GameResultModal />
      <MainContainer>
        <GameContainer>
          <Players>
            <div>
              <p>Player X</p>
              <p>0</p>
            </div>
            <div>
              <p>Player O</p>
              <p>0</p>
            </div>
          </Players>
          <GameBoard>
            {squares.map((value, index) => (
              <Square
                key={index}
                onClick={() => changeValueHandler(index)}
                value={value}
                finish={finish}
              >
                {value}
              </Square>
            ))}
          </GameBoard>
          <RestartBtn>
            <button>Restart Game</button>
          </RestartBtn>
        </GameContainer>
      </MainContainer>
    </>
  );
};

export default TicTacToeGame;
const MainContainer = styled.div`
  width: 375px;
  height: 100%;
  background-color: ${({ theme }) => theme.purple};
  padding: 80px 40px;
`;

const GameContainer = styled.div`
  background-color: ${({ theme }) => theme.dark_purple};
  border-radius: 10px;
  padding: 35px 15px;
`;

const Players = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;

  div:first-child {
    width: 120px;
    height: 70px;
    background-color: ${({ theme }) => theme.sky};
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    color: ${({ theme }) => theme.dark_purple};
    font-weight: 600;
    font-size: 18px;

    p {
      margin-bottom: 10px;
    }
  }
  div:last-child {
    width: 120px;
    height: 70px;
    background-color: ${({ theme }) => theme.yellow};
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    color: ${({ theme }) => theme.dark_purple};
    font-weight: 600;
    font-size: 18px;
    p {
      margin-bottom: 10px;
    }
  }
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 20px;
  margin-bottom: 80px;
`;
const Square = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 55px;
  font-weight: 800;
  width: 70px;
  height: 70px;
  background-color: ${({ theme }) => theme.purple};
  color: ${({ value, theme }) => (value === "X" ? theme.yellow : theme.sky)};
  border-radius: 5px;
  cursor: pointer;
`;

const RestartBtn = styled.div`
  button {
    width: 100%;
    height: 48px;
    background-color: ${({ theme }) => theme.light_sky};
    color: ${({ theme }) => theme.dark_purple};
    font-weight: 700;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
`;
