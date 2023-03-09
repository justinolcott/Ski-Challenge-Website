class Challenge {
  constructor(challengeName, icon, header, body, points) {
    this.challengeName = challengeName;
    this.icon = icon;
    this.header = header;
    this.body = body;
    this.points = points;
  }

  
}

class yourChallenges {
  constructor() {
    this.challenges = [];
  }

  add(challenge) {
    this.challenges.push(challenge);
  }

  createElement(challenge) {
    // Create new challenge element
    const challengeEl = document.createElement('div');
    challengeEl.classList.add('border-top', 'challenge', 'your-challenge');
    challengeEl.setAttribute('name', challenge.challengeName);
  
    // Create header element and add to challenge element
    const headerEl = document.createElement('div');
    headerEl.classList.add('border-top', 'd-flex', 'align-items-center', 'challenge');
    challengeEl.appendChild(headerEl);
  
    // Create checkbox element and add to header element
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.name = 'challenge-' + challenge.challengeName;
    checkboxEl.id = 'challenge-' + challenge.challengeName;
    checkboxEl.classList.add('mr-2');
    checkboxEl.checked = true;
    checkboxEl.addEventListener("click", () => {
        this.removeChallenge(challenge);      
    });
    headerEl.appendChild(checkboxEl);
  
    // Create header text element and add to header element
    const headerTextEl = document.createElement('h4');
    headerTextEl.classList.add('mb-0');
    headerTextEl.innerHTML = `${challenge.header} <span>&#x2714;</span>`;
    headerEl.appendChild(headerTextEl);
  
    // Create body element and add to challenge element
    const bodyEl = document.createElement('div');
    bodyEl.classList.add('border-top', 'challenge');
    challengeEl.appendChild(bodyEl);
  
    // Create body text element and add to body element
    const bodyTextEl = document.createElement('p');
    bodyTextEl.innerHTML = `${challenge.body}`;
    bodyEl.appendChild(bodyTextEl);
    return challengeEl;
  }

  updateFeed() {
    const feedEl = document.querySelector(".your-challenges");
    while (feedEl.firstChild) {
      feedEl.removeChild(feedEl.firstChild);
    }
    //console.log("Challenges[0] = " + this.challenges[0].challengeName);
    for (let challengeKey in this.challenges) {
      let challenge = this.challenges[challengeKey];
      // if (document.querySelector('.your-challenges [name="' + challenge.challengeName + '"]')) {
      //   console.log('Challenge already exists');
      //   continue;
      // }
      
      console.log("challenge=" + challenge.challengeName);
      let child = this.createElement(challenge);
      console.log(child.innerHTML);
      feedEl.appendChild(child);
    }
  }

  removeChallenge(challenge) {
    console.log(this.challenges.length);
    for (let i = 0; i < this.challenges.length; i++) {
      if (this.challenges[i].challengeName === challenge.challengeName) {
        const index = i;
        console.log("Index: " + index);
        if (index > -1) { // only splice array when item is found
          this.challenges.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }
    console.log(this.challenges.length);
    this.updateFeed();
  }
}

class Feed {
  constructor() {
    this.challenges = [];
    this.yourChallenges = new yourChallenges();
  }

  add(challenge) {
    this.challenges.push(challenge);
  }

  createElement(challenge) {
    console.log(challenge.challengeName);
    const challengeName = challenge.challengeName;
    const header = challenge.header + " " + challenge.icon + " - " + challenge.points; 
    const body = challenge.body;
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
    checkboxEl.checked = false;
    checkboxEl.addEventListener("click", (event) => {
      this.click(checkboxEl, challenge);
    });
    headerEl.appendChild(checkboxEl);
  
    // Create header text element and add to header element
    const headerTextEl = document.createElement('h4');
    headerTextEl.classList.add('mb-0');
    headerTextEl.innerHTML = `${header}`;
    headerEl.appendChild(headerTextEl);
  
    // Create body element and add to challenge element
    const bodyEl = document.createElement('div');
    bodyEl.classList.add('border-top', 'challenge');
    challengeEl.appendChild(bodyEl);
  
    // Create body text element and add to body element
    const bodyTextEl = document.createElement('p');
    bodyTextEl.innerHTML = `${body}`;
    bodyEl.appendChild(bodyTextEl);
    return challengeEl;
  }

  fill() {
    this.add(new Challenge("FrequentFlier", "&#x1F7E6;", "Frequent Flier", "Ski every single lift at any resort", 400));
    this.add(new Challenge("DotHopper", "&#x25C6;", "Dot Hopper", "Ski at every Ikon resort in Utah", 600));
    this.add(new Challenge("NinetoFive", "&#x1F7E2;", "The Nine to Five", "Ski at every Ikon resort in Utah", 200));
    this.add(new Challenge("ThePeakHunter", "&#x1F7E6;", "The Peak Hunter", "Ski the highest peak at every resort in your state", 400));
    this.add(new Challenge("TheDistanceSkier", "&#x25C6;", "The Distance Skier", "Ski 500 miles or more in one season", 600));
    this.add(new Challenge("TheSnowboarder", "&#x1F7E2;", "The Snowboarder", "Learn how to snowboard and successfully ride down at least one intermediate run", 200));
  }

  updateFeed() {
    const feedEl = document.querySelector(".challenges-feed");
    console.log("Challenges[0] = " + this.challenges[0].challengeName);
    for (let challengeKey in this.challenges) {
      let challenge = this.challenges[challengeKey];
      console.log("challenge=" + challenge.challengeName);
      let child = this.createElement(challenge);
      console.log(child.innerHTML);
      feedEl.appendChild(child);
    }
  }

  click(checkbox, challenge) {
    console.log("Click");
    console.log("Checkbox:" + checkbox);
    const challengeName = challenge.challengeName;
    console.log(challengeName);
    console.log(checkbox.checked);
    //const checkbox = challenge.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      this.yourChallenges.add(challenge);
      this.yourChallenges.updateFeed();
      console.log(`Added ${challengeName} to user's list of challenges`);
    } else {
      // Remove challenge from user's list of challenges
      //removeChallengeFromList(challengeName);
      this.yourChallenges.removeChallenge(challenge);
      this.yourChallenges.updateFeed();
      console.log(`Removed ${challengeName} from user's list of challenges`);
    }
  }
}




function sortScoreboard() {
  console.log("Sorting...");
  const scoreboard = document.querySelector(".scoreboard-feed");
  const scorers = Array.from(scoreboard.children);
  scorers.sort((a, b) => {
    const pointsA = parseInt(a.querySelector("span").textContent.split(' - ')[1].split(' ')[0]);
    const pointsB = parseInt(b.querySelector("span").textContent.split(' - ')[1].split(' ')[0]);
    console.log(pointsA);
    return pointsB - pointsA;
  });
  scorers.forEach((scorer) => scoreboard.appendChild(scorer));
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

// window.onload = function() {
//   const scoreboard = document.querySelector(".scoreboard-feed");
//   const newItem = document.createElement("li");
//   const name = localStorage.getItem("userName");
//   const points = countChallengePoints();
//   newItem.className = "scorer";
//   newItem.innerHTML = `
//     <h4>${name}<span> - ${points} pts</span></h4>
//   `;
//   scoreboard.appendChild(newItem);
// }

function reload() {
  console.log("reload");
  let feed = new Feed();
  feed.fill();
  feed.updateFeed();
}

window.onload = reload();
