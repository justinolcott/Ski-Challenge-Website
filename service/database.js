const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const challengeCollection = client.db('startup').collection('challenges');
const userCollection = client.db('startup').collection('users');
const usersCollection = client.db('startup').collection('usersList');
const completedCollection = client.db('startup').collection('completedChallenges');

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);
    return user;
}

async function setUserScore(username, score) {
    console.log(username, score);
    const completed = await usersCollection.findOneAndUpdate(
        { username: username },
        { $set: { score: score }},
        { upsert: true, returnOriginal: false }
    );
    console.log(completed);
    return completed;
}

async function addUser(username) {
    console.log("adding user in db");
    const user = {
        username: username,
        score: 0
    }
    await usersCollection.insertOne(user);
    return user;
}

async function getUsers() {
    console.log("getting users from db");
    const query = {};
    const options = {};
    const cursor = await usersCollection.find(query, options);
    return cursor.toArray();
}

function addChallenge(challenge) {
    challengeCollection.insertOne(challenge);
}

function getChallenges() {
    const query = {};
    const options = {};
    const cursor = challengeCollection.find(query, options);
    return cursor.toArray();
}

function clearChallenges() {
    challengeCollection.deleteMany({});
    userCollection.deleteMany({});
    usersCollection.deleteMany({});
    completedCollection.deleteMany({});
}

async function setCompletedChallenges(username, completedChallenges) {
    const completed = await completedCollection.findOneAndUpdate(
        { username: username },
        { $set: { completedChallenges: completedChallenges }},
        { upsert: true, returnOriginal: false }
    );
    return completed;
}

async function getCompletedChallenges(username) {
    const completedChallenges = await completedCollection.findOne({username: username});
    console.log(completedChallenges);
    return completedChallenges;
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addChallenge, 
    getChallenges, 
    clearChallenges,
    addUser,
    getUsers,
    setCompletedChallenges,
    getCompletedChallenges,
    setUserScore
};