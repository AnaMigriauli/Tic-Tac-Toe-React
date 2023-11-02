import { useReducer } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import GameResultModal from "./GameResultModal";
import { Breakpoints } from "../assets/themes/themes";
import img from "../assets/images/tic. tac.toe..svg";

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
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
      let [a, b, c] = combination;
      if (
        state.squares[a] &&
        state.squares[a] === state.squares[b] &&
        state.squares[b] === state.squares[c]
      ) {
        return state.squares[a];
      }
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
        {window.innerWidth >= 1050 && <img src={img} alt="img" />}
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
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.purple};
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: ${Breakpoints.large}) {
    img {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 450px;
    }
  }
`;

const GameContainer = styled.div`
  width: 375px;
  background-color: ${({ theme }) => theme.dark_purple};
  border-radius: 10px;

  @media (min-width: ${Breakpoints.medium}) {
    width: 650px;
    border-radius: 20px;
  }
`;

const Players = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 25px 45px 25px;

  @media (min-width: ${Breakpoints.medium}) {
    margin: 45px 60px;
  }

  div {
    width: 120px;
    height: 60px;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    color: ${({ theme }) => theme.dark_purple};
    font-weight: 600;
    font-size: 18px;
    @media (min-width: ${Breakpoints.medium}) {
      width: 160px;
      height: 70px;
      font-size: 20px;
      border-radius: 10px;
    }

    p {
      margin-bottom: 10px;
    }
  }

  div:first-child {
    background-color: ${({ theme }) => theme.sky};
  }
  div:last-child {
    background-color: ${({ theme }) => theme.yellow};
  }
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 20px;
  margin: 0 25px 40px 25px;
  font-family: "Inter", sans-serif;
  @media (min-width: ${Breakpoints.medium}) {
    margin: 0 60px 60px 60px;
  }
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
  @media (min-width: ${Breakpoints.medium}) {
    width: 100px;
    height: 100px;
    font-size: 70px;
    border-radius: 15px;
  }
`;

const RestartBtn = styled.div`
  margin: 0 25px 40px 25px;
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
    font-family: "Inter", sans-serif;
    &:hover {
      background-color: ${({ theme }) => theme.light_sky_hover};
    }
  }
  @media (min-width: ${Breakpoints.medium}) {
    margin: 0 60px 35px 60px;
    button {
      height: 62px;
      font-size: 24px;
      border-radius: 20px;
    }
  }
`;
