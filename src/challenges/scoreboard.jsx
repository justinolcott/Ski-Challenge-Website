import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export function Scoreboard({ users }) {
  // Sort users by score in descending order
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  return (
    <div className="text-light">
      <h2>Scoreboard</h2>
      <ol>
        {sortedUsers.map((user) => (
          <li key={user._id}>
            <h3>{user.username}: {user.score}</h3>
          </li>
        ))}
      </ol>
    </div>
  );
}