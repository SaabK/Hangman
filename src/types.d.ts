import { Dispatch, SetStateAction } from 'react';

export type Word = {
  word: string,
  category: string,
  hint: string
}

export type WordsPropsType = {
  wordToBeGuessed: Word,
  guessedLetters: string[],
  revealIt: boolean
}

export type HangmanPropsType = {
  incorrectLetters: string[]
}


export type ModalPropsType = {
  basicModal: boolean,
  setBasicModal: Dispatch<SetStateAction<boolean>>,
  title: string,
  description: string
}