const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const challengeCollection = client.db('startup').collection('challenges');

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

module.exports = {addChallenge, getChallenges, clearChallenges};