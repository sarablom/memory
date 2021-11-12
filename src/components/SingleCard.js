import React from "react";
import "../components/SingleCard.css";

function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }     
    }

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="Card front" />
        <img
          className="back"
          src="/img/eco-earth.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}

export default SingleCard;
