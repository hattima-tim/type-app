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

      informationToBeChanged.color = "text-gray-500";
    }
  );
}
