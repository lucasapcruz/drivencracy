import dotenv from "dotenv";
import { MongoClient, ServerApiVersion} from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
  mongoClient.connect();
} catch (err) {
  console.log(err);
}

db = mongoClient.db("drivencracy");

const votes = db.collection("votes");
const choices = db.collection("choices");
const polls = db.collection("polls")

export {
  votes,
  choices,
  polls
}