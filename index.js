const express = require('express');
const app = express();
const DB = require('./database.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const req = require('express/lib/request.js');
const { PeerProxy } = require('./peerProxy.js');
const authCookieName = 'token';


const port = process.argv.length > 2 ? process.argv[2] : 5500;
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());


var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    console.log("Creating a user");
    if (await DB.getUser(req.body.username)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.username, req.body.password);
      await DB.addUser(req.body.username);
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    console.log("Logging in a user");
    const user = await DB.getUser(req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

apiRouter.get('/user/:username', async (req, res) => {
    console.log("Getting user");
    const user = await DB.getUser(req.params.username);
    if (user) {
      const token = req?.cookies.token;
      res.send({ username: user.username, authenticated: token === user.token });
      return;
    }
    res.send({ authenticated: false });
});

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
});


//Users for scoreboard
apiRouter.get('/users', async (_req, res) => {
  console.log("get users");
  const users = await DB.getUsers();
  console.log(users);
  res.send(users);
});

secureApiRouter.post('/setUserScore', async (req, res) => {
  console.log("adding userScore");
  const score = await DB.setUserScore(req.body.username, req.body.score);
  res.send(score);
});

// secureApiRouter.post('/newUser', async (req, res) => {
//   console.log("adding user");
//   DB.addUser(req.body);
//   const users = await DB.getUsers();
//   res.send(users);
// });


//Challenges for feed
secureApiRouter.get('/challenges', async (_req, res) => {
    console.log("get challenges");
    const challenges = await DB.getChallenges();
    res.send(challenges);
});

secureApiRouter.post('/newChallenge', async (req, res) => {
    console.log("add challenge");
    DB.addChallenge(req.body);
    const challenges = await DB.getChallenges();
    res.send(challenges);
});

secureApiRouter.delete('/clearChallenges', async (req, res) => {
    console.log("Clear");
    await DB.clearChallenges();
});

secureApiRouter.get('/completedChallenges/:username', async (req, res) => {
  console.log("Getting completed challenges");
  const completedChallenges = await DB.getCompletedChallenges(req.params.username);
  console.log(completedChallenges);
  res.send(completedChallenges);
});

secureApiRouter.post('/setCompletedChallenges', async (req, res) => {
  console.log("adding completed challenges");
  const completedChallenges = await DB.setCompletedChallenges(req.body.username, req.body.completedChallenges);
  res.send(completedChallenges);
});

app.use((_req, res) => {
    console.log("serving default page");
    res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
});

new PeerProxy(httpService);
