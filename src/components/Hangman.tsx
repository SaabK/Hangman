import { HangmanPropsType } from "../types";

function Hangman({ incorrectLetters }: HangmanPropsType) {

  const hangman = [
    <div id="head" />,
    <div id="body" />,
    <div id="left-hand" />,
    <div id="right-hand" />,
    <div id="left-leg" />,
    <div id="right-leg" />
  ];

  return (
    <div className="hangman">
      <div id="floor" />
      <div id="rod" />
      <div id="support-rod" />
      <div id="small-rod" />
      <div className="man">
        {hangman.slice(0, incorrectLetters.length).map((part, index) => (
          <span key={index}>{part}</span>
        ))}
      </div>
    </div>
  )
}


export default Hangman