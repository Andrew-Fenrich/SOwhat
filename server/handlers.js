const { MongoClient, ObjectID } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const users = await db.collection("users").find().toArray();
    console.log(users);

    client.close();
    console.log("disconnected!");
    return res.status(200).json({ status: 200, users: users });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};
const getUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const email = req.params.email;
  console.log(typeof _id);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const user = await db.collection("users").findOne({ email: email });
    console.log(user);

    client.close();
    console.log("disconnected!");
    return res.status(200).json({ status: 200, user: user });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

const getFactor = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const factors = await db.collection("factors").find().toArray();
    console.log(factors);

    client.close();
    console.log("disconnected!");
    return res.status(200).json({ status: 200, factors: factors });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  getFactor,
};
