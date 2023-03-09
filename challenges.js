function sortScoreboard() {
    // Select the scoreboard-feed list
    const scoreboard = document.querySelector('.scoreboard-feed');
  
    // Get an array of the list items
    const scorers = Array.from(scoreboard.children);
  
    // Sort the list items based on their score values
    scorers.sort(function(a, b) {
      const scoreA = parseInt(a.querySelector('span').textContent);
      const scoreB = parseInt(b.querySelector('span').textContent);
      return scoreB - scoreA;
    });
  
    // Reorder the list items in the scoreboard list
    scorers.forEach(function(scorer) {
      scoreboard.appendChild(scorer);
    });
}

function addChallengeToList(event) {
    const checkbox = event;
    const challengeName = checkbox.parentNode.parentNode.getAttribute('name');
    const challenge = getChallenge(challengeName);
    //const checkbox = challenge.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      addChallenge(challengeName);
      console.log(`Added ${challengeName} to user's list of challenges`);
    } else {
      // Remove challenge from user's list of challenges
      removeChallengeFromList(challengeName);
      const count = countChallengePoints();
      console.log(count);
      localStorage.setItem("points", count);
      console.log(`Removed ${challengeName} from user's list of challenges`);
    }
}

function getChallenge(challengeName) {
    const challengeEl = document.getElementsByName(challengeName)[0];
    return challengeEl;
}

function getChallengeHeader(challengeName) {
    const challengeEl = getChallenge(challengeName);
    const headerEl = challengeEl.querySelector('h4');
    const header = headerEl ? headerEl.textContent.trim() : '';
    return header;
}

function getChallengeBody(challengeName) {
    const challengeEl = getChallenge(challengeName);
    const bodyEl = challengeEl.querySelector('.border-top.challenge p');
    const body = bodyEl ? bodyEl.textContent.trim() : '';
    return body;
}

function addChallenge(challengeName) {
    const yourChallenges = document.querySelector('.your-challenges');
    const header = getChallengeHeader(challengeName);
    const body = getChallengeBody(challengeName);
    // Check if there is already a challenge with this challengeName
    if (document.querySelector('.your-challenges [name="' + challengeName + '"]')) {
      console.log('Challenge already exists');
      return;
    }
    
  
    // Create new challenge element
    const challengeEl = document.createElement('div');
    challengeEl.classList.add('border-top', 'challenge', 'your-challenge');
    challengeEl.setAttribute('name', challengeName);
  
    // Create header element and add to challenge element
    const headerEl = document.createElement('div');
    headerEl.classList.add('border-top', 'd-flex', 'align-items-center', 'challenge');
    challengeEl.appendChild(headerEl);
  
    // Create checkbox element and add to header element
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.name = 'challenge-' + challengeName;
    checkboxEl.id = 'challenge-' + challengeName;
    checkboxEl.classList.add('mr-2');
    checkboxEl.checked = true;
    checkboxEl.addEventListener("click", function() {
        removeChallengeFromList(challengeName);
        document.querySelector('.challenges-feed [name="' + challengeName + '"] input[type="checkbox"]').checked = false;
        

    });
    headerEl.appendChild(checkboxEl);
  
    // Create header text element and add to header element
    const headerTextEl = document.createElement('h4');
    headerTextEl.classList.add('mb-0');
    headerTextEl.innerHTML = `${header} <span>&#x2714;</span>`;
    headerEl.appendChild(headerTextEl);
  
    // Create body element and add to challenge element
    const bodyEl = document.createElement('div');
    bodyEl.classList.add('border-top', 'challenge');
    challengeEl.appendChild(bodyEl);
  
    // Create body text element and add to body element
    const bodyTextEl = document.createElement('p');
    bodyTextEl.innerHTML = `${body}`;
    bodyEl.appendChild(bodyTextEl);
  
    // Add new challenge to the top of the list
    yourChallenges.insertBefore(challengeEl, yourChallenges.firstChild);

    updateCount();
}
  
function removeChallengeFromList(challengeName) {
    const challenge = document.querySelector('.your-challenges [name="' + challengeName + '"]');
    challenge.remove()
    updateCount();
}

function countChallengePoints() {
  const yourChallenges = document.querySelector('.your-challenges');
  const challenges = yourChallenges.querySelectorAll('.your-challenge');
  let totalPoints = 0;
  console.log("For each challenge:" + challenges.length);
  challenges.forEach((challenge) => {
    console.log("Doing a challenge");
    const pointsText = challenge.querySelector('h4').textContent.split(' - ')[1].split(' ')[0];
    console.log("Points:" + pointsText);
    const points = parseInt(pointsText);
    totalPoints += points;
  });

  return totalPoints;
}
  
function updateCount() {
  const scoreboard = document.querySelector(".scoreboard-feed");
  const name = localStorage.getItem("userName");
  const points = countChallengePoints();
  // Get all the scorer elements and loop through them
  const scorers = scoreboard.querySelectorAll(".scorer");
  for (let i = 0; i < scorers.length; i++) {
    const scorer = scorers[i];
    
    // Find the scorer with the given name and update its points
    const h4 = scorer.querySelector("h4");
    const span = h4.querySelector("span");
    if (h4.textContent.includes(name)) {
      span.textContent = ` - ${points} pts`;
      break; // Stop looping after finding the first match
    }
  }
  sortScoreboard();
}

window.onload = function() {
  const scoreboard = document.querySelector(".scoreboard-feed");
  const newItem = document.createElement("li");
  const name = localStorage.getItem("userName");
  const points = countChallengePoints();
  newItem.className = "scorer";
  newItem.innerHTML = `
    <h4>${name}<span> - ${points} pts</span></h4>
  `;
  scoreboard.appendChild(newItem);
}