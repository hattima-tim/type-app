"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
// use uuid package instead of crypto,randomUUID() to create similar
// environment for both testing and production. To use crypto in nodejs you have to
// import the crypto package, but the package does not work in browser
import { segmentToChar } from "./inputHandlers/segmenter";
import { segmentToWord } from "./inputHandlers/segmenter";
import { checkUserInputChars } from "./inputHandlers/inputCheck";
import { markTheWordAsRight } from "./inputHandlers/markWord";
import handleInputCheckResult from "./inputHandlers/handleInputCheckResult";
import { getPageData } from "@/app/bookApi";
import handleBackspace from "./inputHandlers/handleBackspace";

export default function Page() {
  const params = useParams();
  const pageNumber = parseInt(params.page);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [userInput, setUserInput] = useState("");
  const indexOfTheGraphemeCurrentlyChecked = useRef(0);
  const indexOfTheWordCurrentlyChecked = useRef(0);
  const [informationVisibileToTheUser, updateInformationVisibleToTheUser] =
    useImmer<{ id: string; segment: string; color: string }[][]>([]);

  let wordsFromStoredStr = useRef<string[]>([]);
  useEffect(() => {
    async function fetchData() {
      let page = await getPageData(params.book, pageNumber);
      wordsFromStoredStr.current = segmentToWord(page);

      updateInformationVisibleToTheUser(
        wordsFromStoredStr.current.map((word) => {
          return segmentToChar(word).map((char) => {
            return {
              id: uuidv4(),
              segment: char,
              color: "text-gray-500",
            };
          });
        })
      );
    }

    fetchData();
  }, [pageNumber, params.book, updateInformationVisibleToTheUser]);

  const [timeRemaining, setTimeRemaining] = useState(60);

  let timer = useRef<ReturnType<typeof setInterval>>();
  const handleTimer = () => {
    if (timer.current === undefined) {
      timer.current = setInterval(() => {
        setTimeRemaining((prevState) => prevState - 1);
      }, 1000);
    }
  };

  const [wpm, setWpm] = useState(0);

  const calculateWPM = ({
    totalCorrectChars,
    totalIncorrectChars,
  }: {
    totalCorrectChars: number;
    totalIncorrectChars: number;
  }) => {
    const netWpm = (totalCorrectChars / 5 - totalIncorrectChars) / 1;

    return netWpm;
  };

  useEffect(() => {
    if (timeRemaining === 0) {
      clearInterval(timer.current);

      // the following totalTypedCharsInfo related code is not in a seperate
      // function because if I do so, useEffect hook asks to add it
      // in the dependency array. Adding a func in the array makes the hook
      // run on every render
      const totalTypedCharsInfo = informationVisibileToTheUser.reduce(
        (prev, current) => {
          const correctCharsObjs = current.filter(
            (char) => char.color === "text-black"
          );
          const correctCharsStrArr = correctCharsObjs.map((charObj) => {
            return charObj.segment;
          });
          const correctCharsStr = correctCharsStrArr.join("");
          // this is done to calculate each individual char typed. For example,
          // the length of তুমি is 4, not 2

          const totalCorrectChars =
            prev.totalCorrectChars + correctCharsStr.length;

          const incorrectCharsObjs = current.filter(
            (char) => char.color === "text-red-600"
          );
          const incorrectCharsStrArr = incorrectCharsObjs.map((charObj) => {
            return charObj.segment;
          });
          const incorrectCharsStr = incorrectCharsStrArr.join("");

          const totalIncorrectChars =
            prev.totalIncorrectChars + incorrectCharsStr.length;

          return { totalCorrectChars, totalIncorrectChars };
        },
        { totalCorrectChars: 0, totalIncorrectChars: 0 }
      );

      const calculatedWPM = Math.round(calculateWPM(totalTypedCharsInfo));
      setWpm(calculatedWPM);
    }
  }, [timeRemaining, informationVisibileToTheUser]);

  const wordBeingChecked = useRef("");
  const charsOfWordBeingChecked = useRef<string[]>([]);

  const handleUserTyping = (e: ChangeEvent<HTMLInputElement>) => {
    handleTimer();

    setUserInput(e.target.value);

    const userInputWords = segmentToWord(e.target.value);
    const lastInputWord =
      userInputWords.length === 0
        ? ""
        : userInputWords[userInputWords.length - 1]; //otherwise lastInpuWord was getting undefined
    const lastInputWordChars = segmentToChar(lastInputWord);

    if (lastInputWordChars.length < charsOfWordBeingChecked.current.length) {
      // length-1 because, when user starts deleting a word bigger than the wordBeingChecked and
      // comes to a point a where both the above lengths are equal, the value of the
      // indexOfTheGraphemeCurrentlyChecked.current then would be equal to the length. But there is nothing
      // in the length index. So, the code should not execute when the lengths are equal.
      const weCameFromTheFirstCharacterOfAWord =
        0 === indexOfTheGraphemeCurrentlyChecked.current;
      const didWeGetSpaceWhileBackspacing =
        lastInputWordChars[0] === " " && weCameFromTheFirstCharacterOfAWord;

      const weCameFromTheLastCharOfAWord =
        charsOfWordBeingChecked.current.length - 1 ===
        indexOfTheGraphemeCurrentlyChecked.current;
      const didWeGetSpaceWhileForwarding =
        lastInputWordChars[0] === " " && weCameFromTheLastCharOfAWord;

      if (
        (!didWeGetSpaceWhileForwarding || didWeGetSpaceWhileBackspacing) &&
        (userInputWords.length === indexOfTheWordCurrentlyChecked.current ||
          lastInputWordChars.length ===
            indexOfTheGraphemeCurrentlyChecked.current)
      ) {
        const copyIndexOfTheGraphemeCurrentlyChecked = {
          ...indexOfTheGraphemeCurrentlyChecked,
        };
        const copyIndexOfTheWordCurrentlyChecked = {
          ...indexOfTheWordCurrentlyChecked,
        };

        handleBackspace(
          updateInformationVisibleToTheUser,
          copyIndexOfTheGraphemeCurrentlyChecked,
          copyIndexOfTheWordCurrentlyChecked
        );
        indexOfTheWordCurrentlyChecked.current = userInputWords.length - 1;
        indexOfTheGraphemeCurrentlyChecked.current =
          lastInputWordChars.length - 1;
        return;
      }
    }

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
    if (lastInputWord === wordBeingChecked.current) {
      markTheWordAsRight(
        wordBeingChecked.current,
        indexOfTheGraphemeCurrentlyChecked,
        updateInformationVisibleToTheUser,
        indexOfTheWordCurrentlyChecked
      );
    }
  };

  return (
    <>
      <h1>{timeRemaining}</h1>
      <h1>WPM:{wpm}</h1>

      <label htmlFor="input"></label>
      <input
        inputMode="text"
        ref={inputRef}
        id="input"
        onChange={handleUserTyping}
      ></input>

      <div className="flex flex-wrap w-full px-5 h-20 border-gray-700 text-xl">
        {informationVisibileToTheUser.map((charArr) => {
          return charArr.map((char) => {
            return (
              <div
                key={char.id}
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
