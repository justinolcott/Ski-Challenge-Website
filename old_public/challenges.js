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
  constructor(dao) {
    this.challenges = [];
    this.dao = dao;
    this.name = localStorage.getItem("userName");
    this.updateFeed();
  }

  async add(challenge) {
    this.challenges.push(challenge);
    await this.dao.setCompletedChallenges(this.name, this.challenges);
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
    console.log("Creating element", challenge);
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

  async updateFeed() {
    console.log("NAME", this.name);
    this.challenges = await this.dao.getCompletedChallenges(this.name);
    if (this.challenges == null) {
      this.challenges = [];
    }
    console.log("Challenges in updatefeed", this.challenges);
    const feedEl = document.querySelector(".your-challenges");

    //delete feed
    while (feedEl.firstChild) {
      feedEl.removeChild(feedEl.firstChild);
    }

    //this.challenges = DB.get

    //create feed
    for (let challengeKey in this.challenges) {
      let challenge = this.challenges[challengeKey];
      
      let child = this.createElement(challenge);
      feedEl.appendChild(child);
    }

    //update the scoreboard as well
    this.board.updateBoard();
  }

  async removeChallenge(challenge) {
    for (let i = 0; i < this.challenges.length; i++) {
      if (this.challenges[i].challengeName === challenge.challengeName) {
        const index = i;
        if (index > -1) {
          this.challenges.splice(index, 1);
        }
      }
    }

    this.challenges = await this.dao.setCompletedChallenges(this.name, this.challenges);

    //uncheck it in the feed as well
    this.feed.uncheck(challenge);

    //update the yourchallenges
    this.updateFeed();
  }
}

class Feed {
  constructor(completedChallenges, dao, socket) {
    this.dao = dao;
    this.challenges = [];
    this.yourChallenges = completedChallenges;
    this.socket = socket;
    this.name = localStorage.getItem("userName");
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
    this.checkChallenges();
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
    const msg = "Score changed to " + this.board.getPoints();
    this.socket.broadcastEvent(this.name, msg);
  }

  uncheck(challenge) {
    const checkbox = document.querySelector(`.challenges-feed [name="${challenge.challengeName}"] input[type="checkbox"]`);
    checkbox.checked = false;
    const msg = "Score changed to " + this.board.getPoints();
    this.socket.broadcastEvent(this.name, msg);
  }

  async checkChallenges() {
    console.log("Checking challenges");

    this.username = localStorage.getItem("userName");
    console.log("name", this.username);
    const completedChallenges = await this.dao.getCompletedChallenges(this.username);
    console.log("Checking completed challenges");
    console.log(completedChallenges);
    if (completedChallenges == null || completedChallenges.length == 0) {
      return;
    }
    console.log("Checking challenges", completedChallenges[0]);
    for (let i = 0; i < completedChallenges.length; i++) {
      console.log(completedChallenges[i].challengeName);
      this.check(completedChallenges[i].challengeName);
    }
  }

  check(challengeName) {
    const checkbox = document.querySelector(`.challenges-feed [name="${challengeName}"] input[type="checkbox"]`);
    if (checkbox != null) {
      checkbox.checked = true;
    }
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
  constructor(dao, socket) {
    this.dao = dao;
    this.socket = socket;
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
    this.dao.setUserScore(this.name, count);
    if (count === NaN) {
      return 0;
    }

    return count;
  }

  async updateBoard() {
    console.log("Updating Board");
    
    //get users the first time... we will try to use websockets for the rest
    if (this.users == null || this.users.length == 0) {
      this.users = this.users = await this.dao.getUsers();
    }

    console.log(this.users);
    for (var i = 0; i < this.users.length; i++) {
      console.log(this.users[i].username);
      if (this.users[i].username == this.name) {
        console.log("Setting this user: ", this.name);
        this.users[i].score = this.getPoints();
      }
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
    this.socket = new MyWebSocket();

    this.board = new Scoreboard(this.dao, this.socket);
    this.completedChallenges = new CompletedChallenges(this.dao);
    this.feed = new Feed(this.completedChallenges, this.dao, this.socket);
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

  async setUserScore(username, score) {
    console.log("setting user score");
    const response = await fetch('/api/setUserScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        score: score
      })
    });
    console.log(await response.json());
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

  async setCompletedChallenges(username, completedChallenges) {
    console.log("setting completed challenges");
    const response = await fetch('/api/setCompletedChallenges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        completedChallenges: completedChallenges
      })
    });
    this.completedChallenges = await response.json();
    console.log(this.completedChallenges)
    return this.completedChallenges;
  }

  async getCompletedChallenges(username) {
    console.log("Getting challenges", username);
    const response = await fetch(`/api/completedChallenges/${username}`);
    if (!response) {
      console.log("GET no response");
      return;
    }

    try {
      console.log("GET success");
      this.completedChallenges = await response.json();
      console.log(this.completedChallenges);
      return this.completedChallenges.completedChallenges;
    }
    catch {
      console.log("GET Error");
      return null;
    }
  }

  async getChallenges() {
    await this.loadChallenges();
    return this.challenges;
  }
}


//Websocket
class MyWebSocket {
  constructor() {

    let port = window.location.port;
    if (process.env.NODE_ENV !== 'production') {
      port = 3000;
    }

    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.displayMsg('system', 'connected');
    };
    this.socket.onclose = (event) => {
      this.displayMsg('system', 'disconnected');
    };
    this.socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      this.displayMsg(msg.from, msg.value)
    };
  }


  displayMsg(from, msg) {
    const alertText = document.querySelector('#challenge-alert');
    alertText.innerHTML = `${from}: ${msg}`;
  }

  broadcastEvent(from, value) {
    const event = {
      from: from,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
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
