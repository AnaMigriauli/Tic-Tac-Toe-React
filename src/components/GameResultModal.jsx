import Modal from "./portal/Modal";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  p {
    font-size: 25px;
    margin-bottom: 17px;
  }
`;

const Btn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
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
`;
