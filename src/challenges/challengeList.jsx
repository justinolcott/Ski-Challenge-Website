import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

import { Challenge } from './challenge.jsx';
import { Button } from "react-bootstrap";

export function ChallengeList({ challenges = [], onCompleteChallenge, onUncompleteChallenge, addNewChallenge }) {
  console.log(challenges);
  return (
    <div className='text-light'>
      <div className="d-flex align-items-center">
          <h2>Challenge List &nbsp;</h2>
          <span>
            <Button variant='primary' onClick={addNewChallenge} className='bg-primary btn-sm'>
                  New Challenge
                  </Button>
          </span>
      </div>
      {challenges && challenges.map((challenge) => (
        <Challenge
          key={uuidv4()}
          title={challenge.name}
          description={challenge.description}
          points={challenge.points}
          completed={challenge.completed}
          onComplete={() => onCompleteChallenge(challenge.id)}
          onUncomplete={() => onUncompleteChallenge(challenge.id)}
        />
      ))}
    </div>
  );
}