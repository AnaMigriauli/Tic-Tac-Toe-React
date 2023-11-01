import Modal from "./portal/Modal";
import styled from "styled-components";
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
    cursor: pointer;
  }
  button:first-child {
    background-color: ${({ theme }) => theme.yellow};
  }
  button:last-child {
    background-color: ${({ theme }) => theme.sky};
  }
`;
