import handleInputCheckResult from "./handleInputCheckResult";
import { checkUserInputChars } from "./inputCheck";
import { markTheWordAsRight } from "./markWord";

const handleForwardTyping = (
  userInputWords: string[],
  lastInputWordChars: string[],
  lastInputWord: string,
  indexOfTheGraphemeCurrentlyChecked: { current: number },
  indexOfTheWordCurrentlyChecked: { current: number },
  wordBeingChecked: { current: string },
  wordsFromStoredStr: { current: string[] },
  charsOfWordBeingChecked: { current: string[] },
  totalCorrectChars: { current: Array<string> },
  totalIncorrectChars: { current: Array<string> },
  updateInformationVisibleToTheUser: Function,
  segmentToChar: (arg: string) => string[]
) => {
  indexOfTheWordCurrentlyChecked.current = userInputWords.length - 1;
  wordBeingChecked.current =
    wordsFromStoredStr.current[indexOfTheWordCurrentlyChecked.current];
  charsOfWordBeingChecked.current = segmentToChar(wordBeingChecked.current);

  indexOfTheGraphemeCurrentlyChecked.current = lastInputWordChars.length - 1;

  // return from the func if user input exceeds the stored string value
  // this will prevent errors
  if (userInputWords.length > wordsFromStoredStr.current.length) return;

  const isUserInputCorrect = checkUserInputChars(
    lastInputWordChars,
    charsOfWordBeingChecked.current,
    indexOfTheGraphemeCurrentlyChecked.current
  );
  if (isUserInputCorrect === "user exceeded word limit") return;

  handleInputCheckResult(
    isUserInputCorrect,
    updateInformationVisibleToTheUser,
    indexOfTheGraphemeCurrentlyChecked,
    indexOfTheWordCurrentlyChecked,
    totalCorrectChars,
    totalIncorrectChars
  );

  // the following code is necessary for when, a/multiple char in a word
  // incorrectly typed but autocompletion of the whole word makes it
  // correct. So, the following code checks if the whole word is correct
  if (
    lastInputWord.normalize("NFC") === wordBeingChecked.current.normalize("NFC")
  ) {
    markTheWordAsRight(
      wordBeingChecked.current,
      indexOfTheGraphemeCurrentlyChecked,
      updateInformationVisibleToTheUser,
      indexOfTheWordCurrentlyChecked,
      totalCorrectChars,
      totalIncorrectChars
    );
  }
};

export default handleForwardTyping;
