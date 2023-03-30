class Challenge {
  constructor(challengeName, icon, header, body, points) {
    this.challengeName = challengeName;
    this.icon = icon;
    this.header = header;
    this.body = body;
    this.points = points;
  }
}

class CompletedChallenges {
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
      
      let child = this.createElement(challenge);
      feedEl.appendChild(child);
    }
    this.board.updateBoard();
  }

  removeChallenge(challenge) {
    for (let i = 0; i < this.challenges.length; i++) {
      if (this.challenges[i].challengeName === challenge.challengeName) {
        const index = i;
        if (index > -1) {
          this.challenges.splice(index, 1);
        }
      }
    }
    this.feed.uncheck(challenge);

    this.updateFeed();
  }
}

class Feed {
  constructor(completedChallenges, dao) {
    this.dao = dao;
    this.challenges = [];
    this.yourChallenges = completedChallenges;
  }



  addScoreboard(board) {
    this.board = board;
  }
  

  createElement(challenge) {
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


  // fill() {
  //   this.add(new Challenge("FrequentFlier", " ", "Frequent Flier", "Ski every single lift at any resort", 400));
  //   this.add(new Challenge("DotHopper", " ", "Dot Hopper", "Ski at every Ikon resort in Utah", 600));
  //   this.add(new Challenge("NinetoFive", " ", "The Nine to Five", "Ski at every Ikon resort in Utah", 200));
  //   this.add(new Challenge("ThePeakHunter", " ", "The Peak Hunter", "Ski the highest peak at every resort in your state", 400));
  //   this.add(new Challenge("TheDistanceSkier", " ", "The Distance Skier", "Ski 500 miles or more in one season", 600));
  //   this.add(new Challenge("TheSnowboarder", " ", "The Snowboarder", "Learn how to snowboard and successfully ride down at least one intermediate run", 200));
  //   //this.add(new Challenge("Test", "", "Test Header", "Test Descirption", 100));
  // }

  async updateFeed() {
    this.challenges = await this.dao.getChallenges();
    const feedEl = document.querySelector(".challenges-feed");
    for (let challengeKey in this.challenges) {
      let challenge = this.challenges[challengeKey];
      let child = this.createElement(challenge);
      feedEl.appendChild(child);
    }
    this.board.updateBoard();
  }

  click(checkbox, challenge) {
    const challengeName = challenge.challengeName;
    if (checkbox.checked) {
      this.yourChallenges.add(challenge);
      this.yourChallenges.updateFeed();
    } else {
      this.yourChallenges.removeChallenge(challenge);
      this.yourChallenges.updateFeed();
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
  constructor(dao) {
    this.dao = dao;
    this.name = localStorage.getItem("userName");
    this.users = [];
    //this.addUser();
    //this.fill();
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
    if (this.yourChallenges !== undefined) {
      for (let c in this.yourChallenges.challenges) {
        count += Number(this.yourChallenges.challenges[c].points);
      }
      console.log(count);
    }
    return count;
  }

  async updateBoard() {
    console.log("Updating Board");
    this.users = await this.dao.getUsers();
    if (this.users == null) {
      this.users = [];
    }
    const scoreboardEl = document.querySelector(".scoreboard-feed");
    while (scoreboardEl.firstChild) {
      scoreboardEl.removeChild(scoreboardEl.firstChild);
    }
    //this.user.score = this.getPoints();
    function compare(a, b) {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    }
    console.log(this.users);
    this.users.sort(compare);
    
    for (let u in this.users) {
      scoreboardEl.appendChild(new User(this.users[u].username, this.users[u].score).createElement());
    }
  }

  addYourChallenges(yourChallenges) {
    this.yourChallenges = yourChallenges;
  }

}

class ChallengesScreen {
  constructor() {
    console.log("New Challenges Screen");
    this.dao = dao;
    this.board = new Scoreboard(this.dao);
    this.completedChallenges = new CompletedChallenges();
    this.feed = new Feed(this.completedChallenges, this.dao);
    this.board.addYourChallenges(this.completedChallenges);
    this.feed.addScoreboard(this.board);
    this.completedChallenges.addScoreboard(this.board);
    this.completedChallenges.addFeed(this.feed);
    this.feed.updateFeed();   
  }
}

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}








class DAO {
  constructor() {
    this.challenges = [];
    this.completedChallenges = [];
    this.users = [];
  }

 

  loadData() {
    this.loadChallenges();
  }

  async getUsers() {
    console.log("Getting users in dao");
    let users = [];
    const savedUsers = localStorage.getItem("usersList");
    if (savedUsers) {
      users = JSON.parse(savedUsers);
    }
    try {
      const response = await fetch('/api/users');
      users = await response.json();
      console.log("Users in dao:", users);
      localStorage.setItem('usersList', JSON.stringify(this.users));
    } catch {
      const savedUsers = localStorage.getItem("usersList");
    }
    this.users = users;
    return this.users;
  }

  async clearData() {
    await this.clearChallenges();
  }

  async loadChallenges() {
    let challenges = [];
    const savedChallenges = localStorage.getItem("challenges");
    if (savedChallenges) {
      challenges = JSON.parse(savedChallenges);
    }
    try {
      const response = await fetch('/api/challenges');
      challenges = await response.json();
      localStorage.setItem('challenges', JSON.stringify(challenges));
    } catch {
      const savedChallenges = localStorage.getItem("challenges");
    }
    this.challenges = challenges;
  }

  async clearChallenges() {
    localStorage.removeItem("challenges");  
    fetch('/api/clearChallenges', {
      method: 'DELETE'
    })
  }

  setCompletedChallenges(completedChallenges) {
    this.completedChallenges = completedChallenges;
  }

  async getChallenges() {
    await this.loadChallenges();
    return this.challenges;
  }
}


//ALTA API
class AltaWeather {
  // async getAltaWeather() {
  //   const endpoint = 'https://api.weather.gov/points/40.5884,-111.6374';
  
  //   return fetch(endpoint)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Extract the forecast URL from the response data
  //       const forecastUrl = data.properties.forecast;
  
  //       // Make a second HTTP request to get the weather forecast
  //       return fetch(forecastUrl);
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       // Extract the weather information from the response data
  //       const { temperature, detailedForecast } = data.properties.periods[0];
  
  //       // Return an object containing the weather information
  //       return { temperature, detailedForecast };
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }

  static async getWeatherData() {
    const response = await fetch("https://api.weather.gov/gridpoints/SLC/108,167/forecast");
    const data = await response.json();
    return data;
  }
  
  static async updateAlertWithWeather() {
    const forecastData = await this.getWeatherData();
    const detailedForecast = forecastData.properties.periods[0].detailedForecast;
  
    const alertElement = document.querySelector(".alert");
    alertElement.innerHTML = "Alta's Weather: " + detailedForecast;
  }
}

function reload() {
  console.log("Reload");
  challengeScreen = new ChallengesScreen();
  location.reload();
}

function clearStorage() {
  dao.clearChallenges();
  reload();
}

function logout() {
  fetch('/api/auth/logout', {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 204) {
        window.location.href = '/login.html'; // Replace with your desired URL

        console.error(`Failed to clear cookie. Status code: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error('An error occurred while logging out:', error);
    });
}

//Code that actually runs
const dao = new DAO();
let challengeScreen = new ChallengesScreen();
//window.onload = reload();
AltaWeather.updateAlertWithWeather();