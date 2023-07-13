const handleForwardTyping = (
  userInputWords: string[],
  lastInputWordChars: string[],
  lastInputWord: string,
  indexOfTheGraphemeCurrentlyChecked: { current: number },
  indexOfTheWordCurrentlyChecked: { current: number },
  wordBeingChecked: { current: string },
  wordsFromStoredStr: { current: string[] },
  charsOfWordBeingChecked: { current: string[] },
  updateInformationVisibleToTheUser: Function,
  segmentToChar: (arg: string) => string[],
  checkUserInputChars: (
    lastInputWordChars: Array<string>,
    charsOfWordBeingChecked: Array<string>,
    indexOfTheGraphemeCurrentlyChecked: number
  ) => boolean | "user exceeded word limit",
  handleInputCheckResult: (
    arg1: boolean,
    arg2: Function,
    arg3: {
      current: number;
    },
    arg4: {
      current: number;
    }
  ) => void,
  markTheWordAsRight: (
    arg1: string,
    arg2: {
      current: number;
    },
    arg3: Function,
    arg4: {
      current: number;
    }
  ) => void
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
    indexOfTheWordCurrentlyChecked
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
      indexOfTheWordCurrentlyChecked
    );
  }
};

export default handleForwardTyping;
