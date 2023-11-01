import { useReducer } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import GameResultModal from "./GameResultModal";

const actionType = {
  SET_ACTIVE_PLAYER: "SET_ACTIVE_PLAYER",
  SET_SQUARES: "SET_SQUARES",
  SET_GAME_RESULT: "SET_GAME_RESULT",
  SET_PLAYERS_SCORE: "SET_PLAYERS_SCORE",
  SET_WINNER: "SET_WINNER",
  SET_NEXT_ROUND: " SET_NEXT_ROUND",
  SET_NEW_GAME: "SET_NEW_GAME",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_ACTIVE_PLAYER:
      return {
        ...state,
        activePlayer: action.payload,
      };
    case actionType.SET_SQUARES:
      return {
        ...state,
        squares: action.payload,
      };
    case actionType.SET_GAME_RESULT:
      return {
        ...state,
        gameResult: action.payload,
      };
    case actionType.SET_WINNER:
      return {
        ...state,
        winner: action.payload,
      };
    case actionType.SET_PLAYERS_SCORE:
      return {
        ...state,
        playersScore: action.payload,
      };
    case actionType.SET_NEXT_ROUND:
      return {
        activePlayer: "X",
        squares: Array(9).fill(null),
        gameResult: false,
        playersScore: state.playersScore,
        winner: null,
      };
    case actionType.SET_NEW_GAME:
      return {
        activePlayer: "X",
        squares: Array(9).fill(null),
        gameResult: false,
        playersScore: { X: 0, O: 0 },
        winner: null,
      };

    default:
      return state;
  }
};

const TicTacToeGame = () => {
  const [state, dispatch] = useReducer(reducer, {
    activePlayer: "X",
    squares: Array(9).fill(null),
    gameResult: false,
    playersScore: { X: 0, O: 0 },
    winner: null,
  });

  const switchPlayer = () => {
    let active = state.activePlayer === "X" ? "O" : "X";

    dispatch({ type: actionType.SET_ACTIVE_PLAYER, payload: active });
  };

  const checkForWinnerHandler = () => {
    if (
      state.squares[0] !== null &&
      state.squares[0] == state.squares[1] &&
      state.squares[1] == state.squares[2]
    ) {
      console.log(state.squares[0]);
      return state.squares[0];
    } else if (
      state.squares[3] !== null &&
      state.squares[3] == state.squares[4] &&
      state.squares[4] == state.squares[5]
    ) {
      return state.squares[3];
    } else if (
      state.squares[6] !== null &&
      state.squares[6] == state.squares[7] &&
      state.squares[7] == state.squares[8]
    ) {
      return state.squares[6];
    } else if (
      state.squares[0] !== null &&
      state.squares[0] == state.squares[3] &&
      state.squares[3] == state.squares[6]
    ) {
      return state.squares[0];
    } else if (
      state.squares[1] !== null &&
      state.squares[1] == state.squares[4] &&
      state.squares[4] == state.squares[7]
    ) {
      return state.squares[1];
    } else if (
      state.squares[2] !== null &&
      state.squares[2] == state.squares[5] &&
      state.squares[5] == state.squares[8]
    ) {
      return state.squares[2];
    } else if (
      state.squares[0] !== null &&
      state.squares[0] == state.squares[4] &&
      state.squares[4] == state.squares[8]
    ) {
      return state.squares[0];
    } else if (
      state.squares[2] !== null &&
      state.squares[2] == state.squares[4] &&
      state.squares[4] == state.squares[6]
    ) {
      return state.squares[2];
    }
  };

  const scoreHandler = () => {
    const { X, O } = state.playersScore;
    const newScore = { ...state.playersScore };

    if (state.winner === "X") {
      newScore.X = X + 1;
    } else if (state.winner === "O") {
      newScore.O = O + 1;
    }

    dispatch({ type: actionType.SET_PLAYERS_SCORE, payload: newScore });
  };

  const changeValueHandler = (index) => {
    if (state.squares[index]) return;
    const newSquares = state.squares.slice();

    newSquares[index] = state.activePlayer;

    dispatch({ type: actionType.SET_SQUARES, payload: newSquares });
    switchPlayer();
  };

  useEffect(() => {
    let winner = checkForWinnerHandler();

    if (winner) {
      dispatch({ type: actionType.SET_WINNER, payload: winner });
      dispatch({ type: actionType.SET_GAME_RESULT, payload: true });
      scoreHandler();
    }
  }, [state.activePlayer, state.winner]);

  const nextRoundHandler = () => {
    dispatch({ type: actionType.SET_NEXT_ROUND });
  };

  const gameRestartHandler = () => {
    dispatch({ type: actionType.SET_NEW_GAME });
  };
  return (
    <>
      {state.gameResult && (
        <GameResultModal
          winner={state.winner}
          nextRoundHandler={nextRoundHandler}
          gameRestartHandler={gameRestartHandler}
        />
      )}
      <MainContainer>
        <GameContainer>
          <Players>
            <div>
              <p>Player X</p>
              <p>{state.playersScore.X}</p>
            </div>
            <div>
              <p>Player O</p>
              <p>{state.playersScore.O}</p>
            </div>
          </Players>
          <GameBoard>
            {state.squares.map((value, index) => (
              <Square
                key={index}
                onClick={() => changeValueHandler(index)}
                value={value}
                winner={state.gameResult}
              >
                {value}
              </Square>
            ))}
          </GameBoard>
          <RestartBtn>
            <button onClick={gameRestartHandler}>Restart Game</button>
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
