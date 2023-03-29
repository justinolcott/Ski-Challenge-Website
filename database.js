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
}

module.exports = {
    getUser,
    getUserByToken,
    addChallenge, 
    getChallenges, 
    clearChallenges
};