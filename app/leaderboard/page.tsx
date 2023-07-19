export default async function Leaderboard() {
  const response = await fetch("http://localhost:3000/users/leaderboard");
  const sortedUserDataByWPM = await response.json();

  type User = {
    username: "string";
    wpm: "number";
  };

  return (
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
  );
}
