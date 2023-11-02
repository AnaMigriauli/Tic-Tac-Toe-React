import Modal from "./portal/Modal";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Breakpoints } from "../assets/themes/themes";

const GameResultModal = ({ winner, nextRoundHandler, gameRestartHandler }) => {
  return (
    <Modal>
      <ModalContainer>
        <p>Game Over </p>
        <p>Player {winner} Wins !</p>
        <Btn>
          <button onClick={gameRestartHandler}>RESTART GAME</button>
          <button onClick={nextRoundHandler}>NEXT ROUND</button>
        </Btn>
      </ModalContainer>
    </Modal>
  );
};
export default GameResultModal;

GameResultModal.propTypes = {
  winner: PropTypes.bool.isRequired,
  nextRoundHandler: PropTypes.func.isRequired,
  gameRestartHandler: PropTypes.func.isRequired,
};

const ModalContainer = styled.div`
  text-align: center;
  font-family: "Inter", sans-serif;
  p {
    font-size: 25px;
    margin-bottom: 17px;
  }
  @media (min-width: ${Breakpoints.medium}) {
    p {
      font-size: 40px;
      margin-bottom: 25px;
    }
  }
`;

const Btn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  font-family: "Inter", sans-serif;
  button {
    width: 100%;
    height: 38px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    color: ${({ theme }) => theme.purple};
    font-weight: 500;
  }
  button:first-child {
    background-color: ${({ theme }) => theme.yellow};
    &:hover {
      background-color: ${({ theme }) => theme.yellow_hover};
    }
  }
  button:last-child {
    background-color: ${({ theme }) => theme.sky};
    &:hover {
      background-color: ${({ theme }) => theme.sky_hover};
    }
  }
  @media (min-width: ${Breakpoints.medium}) {
    gap: 25px;
    button {
      height: 48px;
      border-radius: 20px;
      font-size: 20px;
    }
  }
`;
