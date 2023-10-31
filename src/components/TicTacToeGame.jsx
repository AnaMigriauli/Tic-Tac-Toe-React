// import { useReducer } from "react";
import styled from "styled-components";

// const reducer = (state, action) => {};

const TicTacToeGame = () => {
  // const gameState = [
  //   { squares: [null, null, null, null, null, null, null, null, null] },
  //   { activePlayers: "X" },
  //   { Score: { X: 0, O: 0 } },
  // ];

  // console.log(state.NumberOfSquare);

  return (
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
            <div key={el}></div>
          ))}
        </GameBoard>
        <RestartBtn>
          <button>Restart Game</button>
        </RestartBtn>
      </GameContainer>
    </MainContainer>
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
  padding: 25px 15px;
`;

const Players = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;

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
  div {
    width: 70px;
    height: 70px;
    background-color: ${({ theme }) => theme.purple};
    border-radius: 5px;
    cursor: pointer;
  }
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
