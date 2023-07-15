import { segmentToChar } from "./segmenter";

export const markTheWordAsRight = (
  wordBeingChecked: string,
  indexOfTheGraphemeCurrentlyChecked: { current: number },
  updateInformationVisibleToTheUser: Function,
  indexOfTheWordCurrentlyChecked: { current: number },
  totalCorrectChars: { current: Array<string> },
  totalIncorrectChars: { current: Array<string> }
): void => {
  const checkedWordChars = segmentToChar(wordBeingChecked);

  const from = 0;
  const to = indexOfTheGraphemeCurrentlyChecked.current + 1;

  updateInformationVisibleToTheUser(
    (draft: Array<Array<{ segment: string; color: string }>>) => {
      const targetWordCharArray = draft[indexOfTheWordCurrentlyChecked.current];

      for (let i = from; i < to; i++) {
        if (totalIncorrectChars.current.includes(checkedWordChars[i])) {
          totalCorrectChars.current.push(checkedWordChars[i]);
          totalIncorrectChars.current = totalIncorrectChars.current.filter(
            (char) => char !== checkedWordChars[i]
          );
        }
        targetWordCharArray[i].segment = checkedWordChars[i];
        targetWordCharArray[i].color = "text-black";
      }
    }
  );
};
