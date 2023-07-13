export default function handleBackspace(
  updateInformationVisibleToTheUser: Function,
  copyIndexOfTheGraphemeCurrentlyChecked: { current: number },
  copyIndexOfTheWordCurrentlyChecked: { current: number }
) {
  updateInformationVisibleToTheUser(
    (draft: Array<Array<{ segment: string; color: string }>>) => {
      let informationToBeChanged =
        draft[copyIndexOfTheWordCurrentlyChecked.current][
          copyIndexOfTheGraphemeCurrentlyChecked.current
        ];

      if (informationToBeChanged) {
        // informationToBeChanged can be undefined for various unprecdible reason
        informationToBeChanged.color = "text-gray-500";
      }
    }
  );
}
