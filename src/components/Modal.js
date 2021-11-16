import ReactDOM from "react-dom";
import "./Modal.css";

function Modal({ turns, shuffleCards, closeModal }) {
  return ReactDOM.createPortal(
    <div className="modalBackdrop" onClick={closeModal}>
      <div className="contentWrapper" onClick={(e) => e.stopPropagation()}>
        <header className="modalTitle">
          <h2>Congratulations!</h2>
        </header>
        <main className="modalContent">
          You finished the game in {turns} turns.
          <br />
          Would you like to play again?
        </main>
        <footer>
          <button
            className="modalBtn"
            onClick={() => {
                shuffleCards();
                closeModal();
            }}>
            Play again
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
