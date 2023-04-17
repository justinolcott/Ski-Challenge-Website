import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './challenges.css';

import { Scoreboard } from './scoreboard';
import { ChallengeList } from './challengeList';
import { CompletedChallenges } from './completedChallenges';
import { GameNotifier } from './myWebSocket';
import { Notifier } from './notifications';

export function ChallengesScreen() {
    const [scoreboard, setScoreboard] = useState([]); //delete
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('Notifications...');
    const [score, setScore] = useState(0); //delete
    const [challenges, setChallenges] = useState([]);
    const [completedChallenges, setCompletedChallenges] = useState([]);
  
    const username = localStorage.getItem("userName");
    useEffect(() => {
      console.log("Starting Challenge Screen", username);
      //Get list of challenges
      fetch('/api/challenges')
      .then((response) => response.json())
      .then((challenges) => {
        setChallenges(challenges);
        localStorage.setItem('challenges', JSON.stringify(challenges));
        
        //Get list of completedChallenges
        fetch(`/api/completedChallenges/${username}`)
          .then((response) => response.json())
          .then((data) => {
            setCompletedChallenges(data.completedChallenges);
            localStorage.setItem('completedChallenges', JSON.stringify(data.completedChallenges));
            
            const newChallenges = challenges.map((challenge) => {
              const isCompleted = data.completedChallenges.some((c) => c.id === challenge.id);
              console.log(isCompleted);
              return { ...challenge, completed: isCompleted };
            });

            setChallenges(newChallenges);
          })
          .catch(() => {
            const comString = localStorage.getItem('completedChallenges');
            if (comString) {
              setCompletedChallenges(JSON.parse(comString));
            }
            console.log(completedChallenges);
          });
        
      })
      .catch(() => {
        const challengesString = localStorage.getItem('challenges');
        if (challengesString) {
          setChallenges(JSON.parse(challengesString));
        }
      });

      //Get list of users for scoreboard
      fetch('/api/users')
        .then((response) => response.json())
        .then((users) => {
          console.log(users);
          setUsers(users);
          localStorage.setItem('users', JSON.stringify(users));
        })
        .catch(() => {
          const usersString = localStorage.getItem('users');
          if (usersString) {
            setUsers(JSON.parse(usersString));
          }
        });
    }, []);

    function getPoints(completedChallenges) {
      let totalPoints = 0;
      for (const challenge of completedChallenges) {
        totalPoints += parseInt(challenge.points);
      }
      return totalPoints;
    }

    function updateScoreboard(points, username) {
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.username === username) {
            return { ...user, score: points };
          } else {
            return user;
          }
        });
      });
    }

    const updateUser = (points, username) => {
      const response = fetch('/api/setUserScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          score: points
        })
      });
    }

    const handleCompleteChallenge = (challengeId) => {


      const completedChallenge = challenges.find(
        (challenge) => challenge.id === challengeId
      );
      const points = getPoints([...completedChallenges, completedChallenge]);
      updateUser(points, username);
      updateScoreboard(points, username);
      console.log("Notifying...", points);
      GameNotifier.broadcastEvent(username, points);



      setCompletedChallenges([...completedChallenges, completedChallenge]);
      const response = fetch('/api/setCompletedChallenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        username: username,
        completedChallenges: [...completedChallenges, completedChallenge]
      })
      });
      setChallenges(challenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return {
            ...challenge,
            completed: true
          };
        }
        return challenge;
      }));
    };

    const handleUncompleteChallenge = (challengeId) => {
      console.log("Uncheck", challengeId, completedChallenges);
      const points = getPoints(completedChallenges.filter((challenge) => challenge.id !== challengeId));
      updateUser(points, username);
      updateScoreboard(points, username);
      GameNotifier.broadcastEvent(username, points);

      setCompletedChallenges(completedChallenges.filter((challenge) => challenge.id !== challengeId));
      const response = fetch('/api/setCompletedChallenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        username: username,
        completedChallenges: completedChallenges.filter((challenge) => challenge.id !== challengeId)
      })
      });
      setChallenges(challenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return {
            ...challenge,
            completed: false
          };
        }
        return challenge;
      }));
      console.log("done unchecking", completedChallenges);
    }


  
    const navigate = useNavigate();
    const handleAddChallenge = () => {
      navigate('/create-challenge');
    }

  

    return (
      <div>
        <Notifier />

        <Row>
          <Col md={4}>
            <Scoreboard users={ users } />
          </Col>
          <Col md={4}>
            <ChallengeList
                challenges={challenges}
                onCompleteChallenge={handleCompleteChallenge}
                onUncompleteChallenge={handleUncompleteChallenge}
                addNewChallenge={handleAddChallenge}
             />
          </Col>
          <Col md={4}>
            <CompletedChallenges 
              completedChallenges={completedChallenges}
              onCompleteChallenge={handleCompleteChallenge}
              onUncompleteChallenge={handleUncompleteChallenge} />
          </Col>
        </Row>
      </div>
    );
  }