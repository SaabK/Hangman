import { WordsPropsType } from "../types";

function Words({ wordToBeGuessed, guessedLetters, revealIt }: WordsPropsType) {
  return (
    <div className="words">
      <div className="category">
        <div>
          Category: <span>{wordToBeGuessed.category}</span>
        </div>
        <div>
          Hint: <span>{wordToBeGuessed.hint}</span>
        </div>
      </div>
      {wordToBeGuessed.word.split(' ').map((word, index) => {
        return <span className="word" key={index}>
          {word.toLowerCase().split('').map((letter, index) => (
            <span className="pre-letter" key={index}>
              <span className={`letter ${revealIt ? 'visibility' : ''} ${guessedLetters.includes(letter) ? 'visible' : null}`}>{letter}</span>
            </span>
          ))}
        </span>
      })}
    </div>
  )
}

export default Words;