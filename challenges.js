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

  addFeed(feed) {
    this.feed = feed;
  }

  addScoreboard(board) {
    this.board = board;
  }

  getChallenges() {
    return this.challenges;
  }


  createElement(challenge) {
    const challengeEl = document.createElement('div');
    challengeEl.classList.add('border-top', 'challenge', 'your-challenge');
    challengeEl.setAttribute('name', challenge.challengeName);
  
    const headerEl = document.createElement('div');
    headerEl.classList.add('border-top', 'd-flex', 'align-items-center', 'challenge');
    challengeEl.appendChild(headerEl);
  
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
  
    const headerTextEl = document.createElement('h4');
    headerTextEl.classList.add('mb-0');
    headerTextEl.innerHTML = `${challenge.header} <span>&#x2714;</span>  - ${challenge.points}`;
    headerEl.appendChild(headerTextEl);
  
    const bodyEl = document.createElement('div');
    bodyEl.classList.add('border-top', 'challenge');
    challengeEl.appendChild(bodyEl);
  
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

    for (let challengeKey in this.challenges) {
      let challenge = this.challenges[challengeKey];
      
      console.log("challenge=" + challenge.challengeName);
      let child = this.createElement(challenge);
      console.log(child.innerHTML);
      feedEl.appendChild(child);
    }
    this.board.updateBoard();
  }

  removeChallenge(challenge) {
    console.log(this.challenges.length);
    for (let i = 0; i < this.challenges.length; i++) {
      if (this.challenges[i].challengeName === challenge.challengeName) {
        const index = i;
        console.log("Index: " + index);
        if (index > -1) {
          this.challenges.splice(index, 1);
        }
      }
    }
    this.feed.uncheck(challenge);

    console.log(this.challenges.length);
    this.updateFeed();
  }
}

class Feed {
  constructor(yourChallenges) {
    this.challenges = [];
    this.yourChallenges = yourChallenges;
  }

  addScoreboard(board) {
    this.board = board;
  }
  

  add(challenge) {
    this.challenges.push(challenge);
  }

  createElement(challenge) {
    console.log(challenge.challengeName);
    const challengeName = challenge.challengeName;
    const header = challenge.header + " " + challenge.icon + " - " + challenge.points; 
    const body = challenge.body;
    const challengeEl = document.createElement('div');
    challengeEl.classList.add('border-top', 'challenge');
    challengeEl.setAttribute('name', challengeName);
  
    const headerEl = document.createElement('div');
    headerEl.classList.add('border-top', 'd-flex', 'align-items-center', 'challenge');
    challengeEl.appendChild(headerEl);
  
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
  
    const headerTextEl = document.createElement('h4');
    headerTextEl.classList.add('mb-0');
    headerTextEl.innerHTML = `${header}`;
    headerEl.appendChild(headerTextEl);
  
    const bodyEl = document.createElement('div');
    bodyEl.classList.add('border-top', 'challenge');
    challengeEl.appendChild(bodyEl);
  
    const bodyTextEl = document.createElement('p');
    bodyTextEl.innerHTML = `${body}`;
    bodyEl.appendChild(bodyTextEl);
    return challengeEl;
  }


  fill() {
    this.add(new Challenge("FrequentFlier", " ", "Frequent Flier", "Ski every single lift at any resort", 400));
    this.add(new Challenge("DotHopper", " ", "Dot Hopper", "Ski at every Ikon resort in Utah", 600));
    this.add(new Challenge("NinetoFive", " ", "The Nine to Five", "Ski at every Ikon resort in Utah", 200));
    this.add(new Challenge("ThePeakHunter", " ", "The Peak Hunter", "Ski the highest peak at every resort in your state", 400));
    this.add(new Challenge("TheDistanceSkier", " ", "The Distance Skier", "Ski 500 miles or more in one season", 600));
    this.add(new Challenge("TheSnowboarder", " ", "The Snowboarder", "Learn how to snowboard and successfully ride down at least one intermediate run", 200));
    //this.add(new Challenge("Test", "", "Test Header", "Test Descirption", 100));
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
    this.board.updateBoard();

    console.log("Custom challenges in feed: " + JSON.parse(localStorage.getItem("customChallenges")).length);
  }

  click(checkbox, challenge) {
    console.log("Click");
    console.log("Checkbox:" + checkbox);
    const challengeName = challenge.challengeName;
    console.log(challengeName);
    console.log(checkbox.checked);
    if (checkbox.checked) {
      this.yourChallenges.add(challenge);
      this.yourChallenges.updateFeed();
      console.log(`Added ${challengeName} to user's list of challenges`);
    } else {
      this.yourChallenges.removeChallenge(challenge);
      this.yourChallenges.updateFeed();
      console.log(`Removed ${challengeName} from user's list of challenges`);
    }
  }
  uncheck(challenge) {
    const checkbox = document.querySelector(`.challenges-feed [name="${challenge.challengeName}"] input[type="checkbox"]`);
    checkbox.checked = false;
  }
}

class User {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  createElement() {
    const li = document.createElement('li');
    li.classList.add('scorer');
    const h4 = document.createElement('h4');
    const nameSpan = document.createElement('span');
    nameSpan.textContent = ` - ${this.score} pts`;
    h4.textContent = this.name;
    h4.appendChild(nameSpan);
    li.appendChild(h4);
    return li;
  }
}

class Scoreboard {
  constructor() {
    this.name = localStorage.getItem("userName");
    this.users = [];
    this.addUser();
    this.fill();
    this.updateBoard();
  }

  fill() {
    this.users.push(new User("Justin", 2000));
    this.users.push(new User("Dennis", 1800));
    this.users.push(new User("Brian", 1400));
    this.users.push(new User("Jason", 1000));
    this.users.push(new User("Haley", 600));
    this.users.push(new User("Sheri", 200));
  }

  addUser() {
    this.user = new User(this.name, this.getPoints());
    this.users.push(this.user);
  }

  getPoints() {
    let count = 0;
    console.log("getting points")
    if (this.yourChallenges !== undefined) {
      for (let c in this.yourChallenges.challenges) {
        count += Number(this.yourChallenges.challenges[c].points);
      }
      console.log(count);
    }
    return count;
  }

  updateBoard() {
    console.log("Updating Board");
    const scoreboardEl = document.querySelector(".scoreboard-feed");
    while (scoreboardEl.firstChild) {
      scoreboardEl.removeChild(scoreboardEl.firstChild);
    }
    this.user.score = this.getPoints();
    function compare(a, b) {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    }
    this.users.sort(compare);
    
    for (let u in this.users) {
      scoreboardEl.appendChild(this.users[u].createElement());
    }
  }

  addYourChallenges(yourChallenges) {
    this.yourChallenges = yourChallenges;
  }

}

class ChallengesScreen {
  constructor() {
    this.board = new Scoreboard();
    this.yourChallenges = new yourChallenges();
    this.feed = new Feed(this.yourChallenges);
    this.board.addYourChallenges(this.yourChallenges);
    this.feed.addScoreboard(this.board);
    this.yourChallenges.addScoreboard(this.board);
    this.yourChallenges.addFeed(this.feed);
    this.feed.fill();
    this,this.addCustomChallenges();
    this.feed.updateFeed();   
  }

  addCustomChallenges() {
    const customChallenges = JSON.parse(localStorage.getItem("customChallenges"));
    for (let k in customChallenges) {
      console.log(k);
      this.feed.add(customChallenges[k]);
    }
  }
}

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

function reload() {
  let challengeScreen = new ChallengesScreen();
  let customChallenges = [];
  //this.reset();

  updateAlertWithWeather();
}


function reset() {
  localStorage.setItem("customChallenges", null);
}
window.onload = reload();

function clearLocalStorage() {
  localStorage.clear();
  reload();
  // Add any additional functionality here, such as resetting the page or displaying a message
}


// WEB SERVICES


function displayAltaWeatherForecast() {
  const url = 
  fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#picture');

      const width = containerEl.offsetWidth;
      const height = containerEl.offsetHeight;

      const imgUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
      const imgEl = document.createElement('img');
      imgEl.setAttribute('src', imgUrl);
      containerEl.appendChild(imgEl);
    });
}

async function getAltaWeather() {
  const endpoint = 'https://api.weather.gov/points/40.5884,-111.6374';

  return fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      // Extract the forecast URL from the response data
      const forecastUrl = data.properties.forecast;

      // Make a second HTTP request to get the weather forecast
      return fetch(forecastUrl);
    })
    .then(response => response.json())
    .then(data => {
      // Extract the weather information from the response data
      const { temperature, detailedForecast } = data.properties.periods[0];

      // Return an object containing the weather information
      return { temperature, detailedForecast };
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

getAltaWeather()
  .then(weather => {
    console.log(`Temperature: ${weather.temperature}\nDescription: ${weather.detailedForecast}`);
  })
  .catch(error => {
    console.error('Error:', error);
  });


async function getWeatherData() {
  const response = await fetch("https://api.weather.gov/gridpoints/SLC/108,167/forecast");
  const data = await response.json();
  return data;
}

async function updateAlertWithWeather() {
  const forecastData = await getWeatherData();
  const detailedForecast = forecastData.properties.periods[0].detailedForecast;

  const alertElement = document.querySelector(".alert");
  alertElement.innerHTML = detailedForecast;
}
