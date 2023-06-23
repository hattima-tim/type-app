"use client";

import { useEffect, useRef } from "react";

const storedString =
  "ওহে বিশ্ব, কি খবর? বাংলা, বিহার ও ওডিশার সর্বশেষ স্বাধীন নবাব সিরাজউদ্দৌলার পতন হয় আজকের দিনে। আজ ২৩ জুন, পলাশী যুদ্ধ দিবস। নবাবের প্রধান সেনাপতি মীর জাফরের বিশ্বাসঘাতকতায় পলাশীর প্রান্তরে হেরে যায় তাঁর বাহিনী, জয় পায় লর্ড ক্লাইভের নেতৃত্বাধীন ব্রিটিশ বাহিনী। এর মধ্য দিয়ে ভারতীয় উপমহাদেশে ব্রিটিশ ইস্ট ইন্ডিয়া কোম্পানির শাসন শুরু হয়। ২০০ বছরের ব্রিটিশ ঔপনিবেশিক শাসনের গোড়াপত্তন ঘটে।";

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

  return (
    <>
      <input inputMode="text" ref={inputRef}></input>
    </>
  );
}
