//npm run start to start the project

import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";
import Modal from "./components/Modal";

//Skapa utanför komponeneten, får då laddas den aldrig om

const cardImages = [
  { src: "/img/no-plastic-bottles.png", matched: false },
  { src: "/img/contaminated.png", matched: false },
  { src: "/img/garbage.png", matched: false },
  { src: "/img/coral-reef.png", matched: false },
  { src: "/img/no-plastic-bags.png", matched: false },
  { src: "/img/global-warming.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

   //Start game automatically
   useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);


  useEffect(() => {
    function checkTrue(card) {
      return card.matched === true;
    }
    
    if (cards.every(checkTrue)) {
      setShowModal(true);
    }  
  }, [cards])

  //Shuffle card
  const shuffleCards = () => {
    //Två kort av varje - totalt 12 kort
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <h1>Find the pollution</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="turns">Turns: {turns}</p>
      {showModal && (
        <Modal
          turns={turns}
          shuffleCards={shuffleCards}
          closeModal={closeModal}
        ></Modal>
      )}
    </div>
  );
}

export default App;
