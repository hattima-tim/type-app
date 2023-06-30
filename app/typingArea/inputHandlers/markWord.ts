import { segmentToChar } from "./segmenter";

export const markTheWordAsRight = (
  wordBeingChecked: string,
  indexOfTheGraphemeCurrentlyChecked: { current: number },
  updateInformationVisibleToTheUser: Function,
  indexOfTheWordCurrentlyChecked: { current: number }
): void => {
  const checkedWordChars = segmentToChar(wordBeingChecked);

  const from = 0;
  const to = indexOfTheGraphemeCurrentlyChecked.current + 1;

  updateInformationVisibleToTheUser(
    (draft: Array<Array<{ segment: string; color: string }>>) => {
      const targetWordCharArray = draft[indexOfTheWordCurrentlyChecked.current];

      for (let i = from; i < to; i++) {
        targetWordCharArray[i].segment = checkedWordChars[i];
        targetWordCharArray[i].color = "text-black";
      }
    }
  );
};
