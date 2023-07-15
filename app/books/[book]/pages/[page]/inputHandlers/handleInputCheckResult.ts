export default function handleInputCheckResult(
  isUserInputCorrect: Boolean,
  updateInformationVisibleToTheUser: Function,
  indexOfTheGraphemeCurrentlyChecked: { current: number },
  indexOfTheWordCurrentlyChecked: { current: number },
  totalCorrectChars: { current: Array<string> },
  totalIncorrectChars: { current: Array<string> }
) {
  if (!isUserInputCorrect) {
    updateInformationVisibleToTheUser(
      (draft: Array<Array<{ segment: string; color: string }>>) => {
        let informationToBeChanged =
          draft[indexOfTheWordCurrentlyChecked.current][
            indexOfTheGraphemeCurrentlyChecked.current
          ];

        informationToBeChanged.color = "text-red-600";
        if (
          totalCorrectChars.current.includes(informationToBeChanged.segment)
        ) {
          totalCorrectChars.current = totalCorrectChars.current.filter(
            (char) => char !== informationToBeChanged.segment
          );
        }
        totalIncorrectChars.current.push(informationToBeChanged.segment);
      }
    );
  } else {
    updateInformationVisibleToTheUser(
      (draft: Array<Array<{ segment: string; color: string }>>) => {
        let informationToBeChanged =
          draft[indexOfTheWordCurrentlyChecked.current][
            indexOfTheGraphemeCurrentlyChecked.current
          ];

        informationToBeChanged.color = "text-black";

        if (
          totalIncorrectChars.current.includes(informationToBeChanged.segment)
        ) {
          totalIncorrectChars.current = totalIncorrectChars.current.filter(
            (char) => char !== informationToBeChanged.segment
          );
        }

        totalCorrectChars.current.push(informationToBeChanged.segment);
      }
    );
  }
}
