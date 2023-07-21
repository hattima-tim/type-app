"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";

export default function Leaderboard() {
  const [authState] = useContext(AuthContext);
  let [response, setResponse] = useState<Response>();

  useEffect(() => {
    fetch("http://localhost:3000/users/leaderboard").then((val) => {
      setResponse(val);
    });
  }, []);

  let [sortedUserDataByWPM, setSortedUserDataByWPM] = useState([]);

  useEffect(() => {
    response?.json().then((val) => {
      setSortedUserDataByWPM(val);
    });
  }, [response]);

  type User = {
    username: string;
    wpm: number;
  };

  return (
    <>
      {authState !== "logged-in" && (
        <div className="bg-indigo-600 px-4 py-3 text-white">
          <p className="text-center text-sm font-medium">
            Want to see your score in the leaderboard?
            <a
              href="/authentication/sign-up"
              className="ml-1 inline-block underline"
            >
              Sign up now!
            </a>
          </p>
        </div>
      )}

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">WPM</th>
          </tr>
        </thead>
        <tbody>
          {sortedUserDataByWPM.map((user: User, index: number) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.wpm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
