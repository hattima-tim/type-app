import { ChangeEvent } from "react";
import handleBackspace from "./handleBackspace";
import handleForwardTyping from "./handleForwardTyping";

const handleUserTyping = (
  e: ChangeEvent<HTMLInputElement>,
  setUserInput: (arg: string) => void,
  segmentToWord: (arg: string) => Array<string>,
  segmentToChar: (arg: string) => Array<string>,
  prevTotalInputCharCount: { current: number },
  indexOfTheGraphemeCurrentlyChecked: { current: number },
  indexOfTheWordCurrentlyChecked: { current: number },
  updateInformationVisibleToTheUser: Function,
  wordBeingChecked: { current: string },
  wordsFromStoredStr: { current: string[] },
  charsOfWordBeingChecked: { current: string[] }
) => {
  if (e.target.value === "") return; // return if input does not contain any value
  setUserInput(e.target.value);

  const userInputWords = segmentToWord(e.target.value);

  const lastInputWord = userInputWords[userInputWords.length - 1]; //otherwise lastInpuWord was getting undefined
  const lastInputWordChars = segmentToChar(lastInputWord);

  const userInputChars = segmentToChar(e.target.value);
  const newTotalInputCharCount = userInputChars.length;
  const isUserBackspacing =
    prevTotalInputCharCount.current > newTotalInputCharCount;
  prevTotalInputCharCount.current = newTotalInputCharCount;

  if (isUserBackspacing) {
    const copyIndexOfTheGraphemeCurrentlyChecked = {
      ...indexOfTheGraphemeCurrentlyChecked,
    };
    const copyIndexOfTheWordCurrentlyChecked = {
      ...indexOfTheWordCurrentlyChecked,
    };

    handleBackspace(
      updateInformationVisibleToTheUser,
      copyIndexOfTheGraphemeCurrentlyChecked,
      copyIndexOfTheWordCurrentlyChecked
    );
    indexOfTheWordCurrentlyChecked.current = userInputWords.length - 1;
    indexOfTheGraphemeCurrentlyChecked.current = lastInputWordChars.length - 1;
    return;
  }

  if (!isUserBackspacing) {
    handleForwardTyping(
      userInputWords,
      lastInputWordChars,
      lastInputWord,
      indexOfTheGraphemeCurrentlyChecked,
      indexOfTheWordCurrentlyChecked,
      wordBeingChecked,
      wordsFromStoredStr,
      charsOfWordBeingChecked,
      updateInformationVisibleToTheUser,
      segmentToChar
    );
  }
};

export default handleUserTyping;
