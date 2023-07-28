import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { KeyboardEvent, useEffect, useState } from "react";
import Hangman from "./components/Hangman";
import Words from "./components/Words";
import { words } from "./data";
import { Word } from "./types";
import Modal from "./components/Modal";
import { ToastContainer, toast } from 'react-toastify';

function randomWord(): Word {
  const randomIndex = Math.floor(Math.random() * words.length);
  return { word: words[randomIndex].word.toLowerCase(), category: words[randomIndex].category.toLowerCase(), hint: words[randomIndex].hint.toLowerCase() };
}

function App() {

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wordToBeGuessed] = useState<Word>(randomWord());
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [revealIt, setRevealIt] = useState<boolean>(false)

  const [basicModal, setBasicModal] = useState<boolean>(false);

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToBeGuessed.word?.split(' ').map(word => word.split("")).reduce((acc, curr) => acc.concat(curr), []).every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = (key: string) => {
    setGuessedLetters(state => [...state, key]);
  }

  const reveal = (): void => {
    setRevealIt(true);
  }

  // TODO: Add toasters for messages

  useEffect(() => {
    if (isWinner) {
      setTimeout(() => {
        setBasicModal(true);
      }, 400);
    }

    if (isLoser) {
      reveal()
      setTimeout(() => {
        setBasicModal(true);
      }, 1100);
    }

    const handleKeyPress = (e: KeyboardEvent): void => {
      const key = e.key;

      // If a key other than alphabetic is pressed then exit:
      if (!key.match(/^[a-z]$/i)) {
        toast('Press a valid key!', {
          type: 'error',
          autoClose: 1700,
          hideProgressBar: true
        });
        return;
      }

      e.preventDefault();

      // if the key pressed was already pressed do not store it again
      if (guessedLetters.includes(key) || incorrectLetters.includes(key) || isLoser || isWinner) {
        toast(`Letter ${key.toUpperCase()} has already been guessed`, {
          type: 'error',
          autoClose: 1700,
          hideProgressBar: true
        });
        return;
      }

      // If the key pressed was not included in the word:
      if (!wordToBeGuessed.word.includes(key)) {
        console.log(!wordToBeGuessed.word.includes(key));
        return setIncorrectLetters(state => [...state, key]);
      }

      addGuessedLetter(key);
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessedLetters, incorrectLetters])

  return (
    <>
      <div className="container">

        {basicModal && isWinner ? <Modal basicModal={basicModal} setBasicModal={setBasicModal} title="Result" description="Congratulations! You've Won The Game 😎 " /> : null}

        {basicModal && isLoser ? <Modal basicModal={basicModal} setBasicModal={setBasicModal} title="Result" description="Unfortunately! You Are Absolutely Worst at This Game 🥸 " /> : null}

        <Hangman incorrectLetters={incorrectLetters} />
        <Words wordToBeGuessed={wordToBeGuessed} guessedLetters={guessedLetters} revealIt={revealIt} />
        <ToastContainer />
      </div>
    </>
  )
}

export default App;