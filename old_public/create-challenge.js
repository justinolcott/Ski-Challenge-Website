class Challenge {
    constructor(challengeName, icon, header, body, points) {
      this.challengeName = challengeName;
      this.icon = icon;
      this.header = header;
      this.body = body;
      this.points = points;
    }
}
class MyWebSocket {
  constructor() {
    
    let port = window.location.port;
    if (process.env.NODE_ENV !== 'production') {
      port = 3000;
    }

    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      //this.displayMsg('system', 'connected');
    };
    this.socket.onclose = (event) => {
      //this.displayMsg('system', 'disconnected');
    };
    this.socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      //this.displayMsg(msg.from, msg.value)
    };
  }

  broadcastEvent(from, value) {
    const event = {
      from: from,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
  }
}
const socket = new MyWebSocket();
function createNewChallenge() {
  const nameEl = document.querySelector("#challengeNameForm");
    const descEl = document.querySelector("#challengeDescriptionForm");
    const pointEl = document.querySelector("#challengePointForm");
    let str = nameEl.value;
    str = str.replace(/\s/g, '');
    let customChallenges = [];

    const customChallenge = new Challenge(str, " ", nameEl.value, descEl.value, pointEl.value);
    saveNewChallenge(customChallenge);
    const username = localStorage.getItem("userName");
    socket.broadcastEvent(username, "Created a new challenge");

    window.location.href = "challenges.html";
}



async function saveNewChallenge(challenge) {
  console.log("saving new challenge");
  try {
    const response = await fetch('/api/newchallenge', {
      method: 'POST',
      headers: { 'content-type' : 'application/json' },
      body: JSON.stringify(challenge),
    });

    const responseText = await response.text();
    if (responseText) {
      const challenges = JSON.parse(responseText);
      localStorage.setItem('customChallenges', JSON.stringify(challenges));
    } else {
      console.log("adding challenge error: empty response");
    }
  }
  catch {
    //update locally
    console.log("adding challenge error");
  }
}
  

const pass = document.getElementById("challengePointForm");
pass.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
    createNewChallenge();
    }
});