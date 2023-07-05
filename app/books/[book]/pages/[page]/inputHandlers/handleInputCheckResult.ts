export default function handleInputCheckResult(
  isUserInputCorrect: Boolean,
  updateInformationVisibleToTheUser: Function,
  indexOfTheGraphemeCurrentlyChecked: { current: number },
  indexOfTheWordCurrentlyChecked: { current: number }
) {
  if (!isUserInputCorrect) {
    updateInformationVisibleToTheUser(
      (draft: Array<Array<{ segment: string; color: string }>>) => {
        let informationToBeChanged =
          draft[indexOfTheWordCurrentlyChecked.current][
            indexOfTheGraphemeCurrentlyChecked.current
          ];

        informationToBeChanged.color = "text-red-600";
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
      }
    );
  }
}
