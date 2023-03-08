function setScoreboard() {
    // Select the scoreboard-feed list
    const scoreboard = document.querySelector('.scoreboard-feed');

    // Create a new list item element
    const newScorer = document.createElement('li');
    newScorer.classList.add('scorer');

    // Create a new h4 element and set its text content
    const nameEl = document.createElement('h4');
    nameEl.textContent = 'John';
    newScorer.appendChild(nameEl);

    // Create a new span element and set its text content
    const scoreEl = document.createElement('span');
    scoreEl.textContent = ' - 500 pts';
    nameEl.appendChild(scoreEl);

    // Get the first item in the scoreboard list
    const firstScorer = scoreboard.firstChild;

    // Insert the new list item before the first item in the scoreboard list
    scoreboard.insertBefore(newScorer, firstScorer);

    sortScoreboard();
}

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
    challengeEl.classList.add('border-top', 'challenge');
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
    checkboxEl.onclick = function() {
      addChallengeToList();
    };
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
}
  
function removeChallengeFromList(challengeName) {
    const challenge = document.querySelector('.your-challenges [name="' + challengeName + '"]');
    challenge.remove()
}

  
  