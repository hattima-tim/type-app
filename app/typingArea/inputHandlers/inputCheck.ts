export const checkUserInputChars = (
  lastInputWordChars: Array<string>,
  charsOfWordBeingChecked: Array<string>,
  indexOfTheGraphemeCurrentlyChecked: number
) => {
  if (lastInputWordChars.length > charsOfWordBeingChecked.length)
    return "user exceeded word limit";

  const charToBeCheckedFromStoredStr =
    charsOfWordBeingChecked[indexOfTheGraphemeCurrentlyChecked];
  const charToBeCheckedFromUserInput =
    lastInputWordChars[indexOfTheGraphemeCurrentlyChecked];

  return charToBeCheckedFromStoredStr === charToBeCheckedFromUserInput;
};
