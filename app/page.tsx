"use client";

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

const storedString =
  "ভাড়াটে যোদ্ধা সরবরাহকারী প্রতিষ্ঠান ভাগনার গ্রুপের প্রধান ইয়েভগেনি প্রিগোশিন বেলারুশে যাচ্ছেন। রাশিয়ার রাষ্ট্রীয় গণমাধ্যমের খবরে বলা হয়েছে, বিদ্রোহের কারণে তাঁর বিরুদ্ধে যেসব অভিযোগ আনা হয়েছে সেগুলো তুলে নেওয়া হবে।";

let wordsFromStoredStr = segmentToWord(storedString);

export default function App({
  testStringForTesting,
}: {
  testStringForTesting?: string;
}) {
  if (testStringForTesting)
    wordsFromStoredStr = segmentToWord(testStringForTesting);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [userInput, setUserInput] = useState("");
  const indexOfTheGraphemeCurrentlyChecked = useRef(0);
  const indexOfTheWordCurrentlyChecked = useRef(0);
  const [informationVisibileToTheUser, updateInformationVisibleToTheUser] =
    useImmer(
      wordsFromStoredStr.map((word) => {
        return segmentToChar(word).map((char) => {
          return {
            id: uuidv4(),
            segment: char,
            color: "text-gray-500",
          };
        });
      })
    );

  const [timeRemaining, setTimeRemaining] = useState(60);

  let timer = useRef<ReturnType<typeof setInterval>>();
  const handleTimer = () => {
    if (timer.current === undefined) {
      timer.current = setInterval(() => {
        setTimeRemaining((prevState) => prevState - 1);
      }, 1000);
    }
  };

  useEffect(() => {
    if (timeRemaining === 0) {
      clearInterval(timer.current);
    }
  }, [timeRemaining]);

  // Rest of your component
  const handleUserTyping = (e: ChangeEvent<HTMLInputElement>) => {
    // prevent errors in the case when user clicks backspace even if there is no
    // char/word in the input field
    handleTimer();

    if (e.target.value === "") return;
    setUserInput(e.target.value);

    const userInputWords = segmentToWord(e.target.value);
    indexOfTheWordCurrentlyChecked.current = userInputWords.length - 1;
    const wordBeingChecked =
      wordsFromStoredStr[indexOfTheWordCurrentlyChecked.current];
    const charsOfWordBeingChecked = segmentToChar(wordBeingChecked);

    const lastInputWord = userInputWords[userInputWords.length - 1];
    const lastInputWordChars = segmentToChar(lastInputWord);
    indexOfTheGraphemeCurrentlyChecked.current = lastInputWordChars.length - 1;

    // return from the func if user input exceeds the stored string value
    // this will prevent errors
    if (userInputWords.length > wordsFromStoredStr.length) return;

    const isUserInputCorrect = checkUserInputChars(
      lastInputWordChars,
      charsOfWordBeingChecked,
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
    if (lastInputWord === wordBeingChecked) {
      markTheWordAsRight(
        wordBeingChecked,
        indexOfTheGraphemeCurrentlyChecked,
        updateInformationVisibleToTheUser,
        indexOfTheWordCurrentlyChecked
      );
    }
  };

  return (
    <>
      <h1>{timeRemaining}</h1>
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
