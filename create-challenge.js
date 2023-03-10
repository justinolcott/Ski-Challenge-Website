class Challenge {
    constructor(challengeName, icon, header, body, points) {
      this.challengeName = challengeName;
      this.icon = icon;
      this.header = header;
      this.body = body;
      this.points = points;
    }
  
    
  }

function createNewChallenge() {
    const nameEl = document.querySelector("#challengeNameForm");
    const descEl = document.querySelector("#challengeDescriptionForm");
    const pointEl = document.querySelector("#challengePointForm");
    let str = nameEl.value;
    str = str.replace(/\s/g, '');
    let customChallenges = [];
    customChallenges = JSON.parse(localStorage.getItem("customChallenges"));
    const customChallenge = new Challenge(str, " ", nameEl.value, descEl.value, pointEl.value);
    customChallenges.push(customChallenge);
    console.log("Length" + customChallenges.length);
    localStorage.setItem("customChallenges", JSON.stringify(customChallenges));
    window.location.href = "challenges.html";
}
  

const pass = document.getElementById("challengePointForm");
pass.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
    createNewChallenge();
    }
});