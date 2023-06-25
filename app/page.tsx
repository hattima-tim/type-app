"use client";

import { useState, useCallback, useEffect, useRef, ChangeEvent } from "react";
import { useImmer } from "use-immer";

const storedString = "যুদ্ধ হবেরে খেলা হবেরে";

const segmentToChar = (str: string) => {
  const charSegmenter = new Intl.Segmenter("bn", { granularity: "grapheme" });
  const graphemes = Array.from(charSegmenter.segment(str), (s) => s.segment);

  return graphemes;
};
const graphemesFromStoredStr = segmentToChar(storedString);

const segmentToWord = (str: string) => {
  const wordSegmenter = new Intl.Segmenter("bn", { granularity: "word" });
  const words = Array.from(wordSegmenter.segment(str), (s) => s.segment);

  return words;
};
const wordsFromStoredStr = segmentToWord(storedString);

export default function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [userInput, setUserInput] = useState("");

  const indexOfTheGraphemeCurrentlyChecked = useRef(0);
  const checkUserInputChars = (lastInputWordChars: Array<string>) => {
    const wordBeingChecked =
      wordsFromStoredStr[indexOfTheWordCurrentlyChecked.current];
    const charsOfWordBeingChecked = segmentToChar(wordBeingChecked);

    // return if user types too much
    if (lastInputWordChars.length > charsOfWordBeingChecked.length)
      return "user exceeded word limit";

    const charToBeCheckedFromStoredStr =
      charsOfWordBeingChecked[indexOfTheGraphemeCurrentlyChecked.current];
    const charToBeCheckedFromUserInput =
      lastInputWordChars[indexOfTheGraphemeCurrentlyChecked.current];

    if (charToBeCheckedFromStoredStr === charToBeCheckedFromUserInput) {
      return true;
    }

    return false;
  };

  const [informationVisibileToTheUser, updateInformationVisibleToTheUser] =
    useImmer(
      wordsFromStoredStr.map((word) => {
        return segmentToChar(word).map((char) => {
          return { segment: char, color: "text-gray-500" };
        });
      })
    );

  const indexOfTheWordCurrentlyChecked = useRef(0);
  // const checkUserInputWords = (userInputWords: Array<string>) => {
  //   indexOfTheWordCurrentlyChecked.current = userInputWords.length - 1;

  //   const wordToBeCheckedFromStoredStr =
  //     wordsFromStoredStr[indexOfTheWordCurrentlyChecked.current];
  //   const wordToBeCheckedFromUserInput =
  //     userInputWords[indexOfTheWordCurrentlyChecked.current];

  //   if (wordToBeCheckedFromStoredStr === wordToBeCheckedFromUserInput) {
  //     const checkedWordChars = segmentToChar(wordToBeCheckedFromStoredStr);
  //     const wordLength = checkedWordChars.length - 1;

  //     const from = indexOfTheGraphemeCurrentlyChecked.current - wordLength;
  //     const to = indexOfTheGraphemeCurrentlyChecked.current + 1;

  //     updateInformationVisibleToTheUser((draft) => {
  //       // Update the information directly instead of using splice
  //       // using splice was causing bugs
  //       for (let i = from; i < to; i++) {
  //         draft[i].segment = checkedWordChars[i - from];
  //         draft[i].color = "text-black";
  //       }
  //     });
  //   }
  // };

  const handleUserTyping = (e: ChangeEvent<HTMLInputElement>) => {
    // prevent errors in the case when user clicks backspace even if there is no
    // char/word in the input field
    if (e.target.value === "") return;

    setUserInput(e.target.value);

    const userInputWords = segmentToWord(e.target.value);
    indexOfTheWordCurrentlyChecked.current = userInputWords.length - 1;

    const lastInputWord = userInputWords[userInputWords.length - 1];
    const lastInputWordChars = segmentToChar(lastInputWord);
    indexOfTheGraphemeCurrentlyChecked.current = lastInputWordChars.length - 1;

    // return the func if user input exceeds the stored string value
    // this will prevent errors
    if (userInputWords.length > wordsFromStoredStr.length) return;

    const isUserInputCorrect = checkUserInputChars(lastInputWordChars);
    if (isUserInputCorrect === "user exceeded word limit") return;
    if (!isUserInputCorrect) {
      updateInformationVisibleToTheUser((draft) => {
        let informationToBeChanged =
          draft[indexOfTheWordCurrentlyChecked.current][
            indexOfTheGraphemeCurrentlyChecked.current
          ];

        informationToBeChanged.color = "text-red-600";
      });
    } else {
      updateInformationVisibleToTheUser((draft) => {
        let informationToBeChanged =
          draft[indexOfTheWordCurrentlyChecked.current][
            indexOfTheGraphemeCurrentlyChecked.current
          ];

        informationToBeChanged.segment = informationToBeChanged.segment;
        informationToBeChanged.color = "text-black";
      });
    }

    // the following code is necessary for when, a/multiple char in a word
    // incorrectly typed but autocompletion of the whole word makes it
    // correct. So, the following code checks if the whole word is correct
    // const userInputWords = segmentToWord(e.target.value);
    // checkUserInputWords(userInputWords);
  };

  return (
    <>
      <input
        inputMode="text"
        ref={inputRef}
        onChange={handleUserTyping}
      ></input>
      <div className="flex flex-wrap w-full px-5 h-20 border-gray-700 text-xl">
        {informationVisibileToTheUser.map((charArr) => {
          return charArr.map((char) => {
            return (
              <div
                key={crypto.randomUUID()}
                className={`${char.color} ${
                  char.segment === " " ? "mr-2" : "mr-0"
                }`}
              >
                {char.segment}
              </div>
            );
          });
        })}
      </div>
    </>
  );
}
