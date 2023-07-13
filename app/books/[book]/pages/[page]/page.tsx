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
import { getPageData } from "@/app/bookApi";
import handleUserTyping from "./inputHandlers/handleUserTyping";
import React from "react";

export default function Page() {
  const params = useParams();
  const pageNumber = parseInt(params.page);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputFieldIsInFocus, setInputFieldIsInFocus] = useState(true);
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.addEventListener("focus", () => {
      setInputFieldIsInFocus(true);
    });
    inputRef.current?.addEventListener("blur", () => {
      setInputFieldIsInFocus(false);
    });
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
  const prevTotalInputCharCount = useRef(0);

  const handleUserTypingWrapper = (e: ChangeEvent<HTMLInputElement>) => {
    handleUserTyping(
      e,
      setUserInput,
      segmentToWord,
      segmentToChar,
      prevTotalInputCharCount,
      indexOfTheGraphemeCurrentlyChecked,
      indexOfTheWordCurrentlyChecked,
      updateInformationVisibleToTheUser,
      wordBeingChecked,
      wordsFromStoredStr,
      charsOfWordBeingChecked
    );
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
        onChange={handleUserTypingWrapper}
      ></input>

      <div className="flex flex-wrap w-full px-5 h-20 border-gray-700 text-xl">
        {informationVisibileToTheUser.map((charArr, wordIndex) => {
          return charArr.map((char, charIndex) => {
            return (
              <React.Fragment key={char.id}>
                <div
                  className={`${char.color} ${
                    char.segment === " " ? "mr-2" : "mr-0"
                  }`}
                >
                  {char.segment}
                </div>

                {inputFieldIsInFocus &&
                  indexOfTheGraphemeCurrentlyChecked.current === charIndex &&
                  indexOfTheWordCurrentlyChecked.current === wordIndex && (
                    <div className="bg-black h-5 self-center w-[2px]"></div>
                  )}
              </React.Fragment>
            );
          });
        })}
      </div>
    </>
  );
}
