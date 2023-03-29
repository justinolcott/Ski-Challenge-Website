class Challenge {
    constructor(challengeName, icon, header, body, points) {
      this.challengeName = challengeName;
      this.icon = icon;
      this.header = header;
      this.body = body;
      this.points = points;
    }
}

// function createNewChallengeLocal() {
//     const nameEl = document.querySelector("#challengeNameForm");
//     const descEl = document.querySelector("#challengeDescriptionForm");
//     const pointEl = document.querySelector("#challengePointForm");
//     let str = nameEl.value;
//     str = str.replace(/\s/g, '');
//     let customChallenges = [];
//     customChallenges = JSON.parse(localStorage.getItem("customChallenges"));
//     if (customChallenges === null) {
//         customChallenges = [];
//     }
//     const customChallenge = new Challenge(str, " ", nameEl.value, descEl.value, pointEl.value);
//     customChallenges.push(customChallenge);
//     console.log("Length" + customChallenges.length);
//     localStorage.setItem("customChallenges", JSON.stringify(customChallenges));
//     window.location.href = "challenges.html";
// }

function createNewChallenge() {
  const nameEl = document.querySelector("#challengeNameForm");
    const descEl = document.querySelector("#challengeDescriptionForm");
    const pointEl = document.querySelector("#challengePointForm");
    let str = nameEl.value;
    str = str.replace(/\s/g, '');
    let customChallenges = [];

    const customChallenge = new Challenge(str, " ", nameEl.value, descEl.value, pointEl.value);
    saveNewChallenge(customChallenge);
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