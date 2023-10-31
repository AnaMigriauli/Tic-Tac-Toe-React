import Modal from "./portal/Modal";
import styled from "styled-components";
const GameResultModal = () => {
  return (
    <Modal>
      <ModalContainer>
        <p>Game Over </p>
        <p>Player O Wins !</p>
        <Btn>
          <button>RESTART GAME</button>
          <button>NEXT ROUND</button>
        </Btn>
      </ModalContainer>
    </Modal>
  );
};
export default GameResultModal;

const ModalContainer = styled.div`
  text-align: center;

  p:first-child {
    font-size: 25px;
    margin-bottom: 15px;
  }
  p:last-child {
    font-size: 32px;
    margin-bottom: 15px;
  }
`;

const Btn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  button {
    width: 100%;
    height: 38px;
    border: none;
    border-radius: 10px;
  }
  button:first-child {
    background-color: ${({ theme }) => theme.yellow};
  }
  button:last-child {
    background-color: ${({ theme }) => theme.sky};
  }
`;
