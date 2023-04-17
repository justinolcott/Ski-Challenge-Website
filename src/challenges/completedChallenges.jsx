import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Challenge } from "./challenge";
import { v4 as uuidv4 } from 'uuid';



export function CompletedChallenges({ completedChallenges = [], onCompleteChallenge, onUncompleteChallenge }) {
  console.log("completed challenge component",completedChallenges);
    return (
      <div className="text-light">
        <h2>Completed Challenges</h2>
        {completedChallenges && completedChallenges.map((challenge) => (
        <Challenge
          key={uuidv4()}
          title={challenge.name}
          description={challenge.description}
          points={challenge.points}
          completed={true}
          onComplete={() => onCompleteChallenge(challenge.id)}
          onUncomplete={() => onUncompleteChallenge(challenge.id)}
        />
      ))}
      </div>
    );
  }