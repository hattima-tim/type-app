"use client";

import { useEffect, useRef } from "react";

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
