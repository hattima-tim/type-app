"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef, ChangeEvent, useContext } from "react";
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
import { AuthContext } from "@/app/authContext";

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

  const [minutePassed, setMinutePassed] = useState(0);
  const [timerStatus, setTimerStatus] = useState("off");

  useEffect(() => {
    let timeOutId: number | NodeJS.Timeout;
    if (timerStatus === "on") {
      timeOutId = setTimeout(() => {
        setMinutePassed((prev) => prev + 1);
      }, 60000);
    }

    return () => clearTimeout(timeOutId);
  }, [minutePassed, timerStatus]);

  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    // the following totalTypedCharsInfo related code is not in a seperate
    // function because if I do so, useEffect hook asks to add it
    // in the dependency array. Adding a func in the array makes the hook
    // run on every render. react suggested it is clean to move the code inside the effect
    const calculateWPM = () => {
      const netWpm =
        ((totalCorrectChars.current.length +
          totalIncorrectChars.current.length) /
          5 -
          totalIncorrectChars.current.length) /
        minutePassed;

      return netWpm !== Infinity && netWpm ? netWpm : 0; //netWpm is NaN if it is not calculated yet because minutePassed is 0 then
    };

    const calculatedWPM = Math.round(calculateWPM());
    setWpm(calculatedWPM);
  }, [minutePassed]);

  const sendWpmDataToBackend = async (wpm: number) => {
    try {
      await fetch("http://localhost:3000/users/user/wpm", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wpm: wpm }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [authContext] = useContext(AuthContext);

  useEffect(() => {
    if (authContext === "logged-in") {
      sendWpmDataToBackend(wpm);
    }
  }, [wpm, authContext]);

  const wordBeingChecked = useRef("");
  const charsOfWordBeingChecked = useRef<string[]>([]);
  const prevTotalInputCharCount = useRef(0);
  const totalCorrectChars = useRef([]);
  const totalIncorrectChars = useRef([]);

  const handleUserTypingWrapper = (e: ChangeEvent<HTMLInputElement>) => {
    if (timerStatus === "off") {
      setTimerStatus("on");
    }

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
      charsOfWordBeingChecked,
      totalCorrectChars,
      totalIncorrectChars
    );
  };

  return (
    <>
      <h1>{minutePassed}</h1>
      <h1>WPM:{wpm}</h1>

      <label htmlFor="input"></label>
      <input
        inputMode="text"
        ref={inputRef}
        id="input"
        onChange={handleUserTypingWrapper}
      ></input>

      <div
        className="flex flex-wrap w-full px-80 border-gray-700 text-xl"
        onClick={() => inputRef.current?.focus()}
      >
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
