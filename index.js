const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 5500;
app.use(express.json());
app.use(express.static('public'));


var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/challenges', async (_req, res) => {
    console.log("get challenges");
    const challenges = await DB.getChallenges();
    res.send(challenges);
});

apiRouter.post('/newChallenge', async (req, res) => {
    console.log("add challenge");
    DB.addChallenge(req.body);
    const challenges = await DB.getChallenges();
    //challenges = addChallenge(req.body, challenges);
    res.send(challenges);
});

apiRouter.delete('/clearChallenges', async (req, res) => {
    console.log("Clear");
    await DB.clearChallenges();
});

// function addChallenge(newChallenge, challenges) {
//     if (challenges.length == 0) {
//         //challenges = fill(challenges);
//     }
//     challenges.push(newChallenge);
//     return challenges;
// }



app.use((_req, res) => {
    console.log("serving default page");
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
});




// //CHALLENGES
// class Challenge {
//     constructor(challengeName, icon, header, body, points) {
//         this.challengeName = challengeName;
//         this.icon = icon;
//         this.header = header;
//         this.body = body;
//         this.points = points;
//     }
// }

// function fill(challenges) {
//     challenges.push(new Challenge("FrequentFlier", " ", "Frequent Flier", "Ski every single lift at any resort", 400));
//     challenges.push(new Challenge("DotHopper", " ", "Dot Hopper", "Ski at every Ikon resort in Utah", 600));
//     challenges.push(new Challenge("NinetoFive", " ", "The Nine to Five", "Ski at every Ikon resort in Utah", 200));
//     challenges.push(new Challenge("ThePeakHunter", " ", "The Peak Hunter", "Ski the highest peak at every resort in your state", 400));
//     challenges.push(new Challenge("TheDistanceSkier", " ", "The Distance Skier", "Ski 500 miles or more in one season", 600));
//     challenges.push(new Challenge("TheSnowboarder", " ", "The Snowboarder", "Learn how to snowboard and successfully ride down at least one intermediate run", 200));
//     //challenges.push(new Challenge("Test", "", "Test Header", "Test Description", 100));
//     return challenges;
// }


