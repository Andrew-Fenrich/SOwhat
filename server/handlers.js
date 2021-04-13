const { MongoClient, ObjectID } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//function to get all active users
const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const users = await db.collection("users").find().toArray();

    client.close();
    console.log("disconnected!");
    return res.status(200).json({ status: 200, users: users });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//function to get a single user
const getUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const email = req.params.email;
  console.log(typeof _id);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const user = await db.collection("users").findOne({ email: email });

    client.close();
    console.log("disconnected!");
    return res.status(200).json({ status: 200, user: user });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

// function to get a list of factors for analysis
const getFactor = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const factors = await db.collection("factors").find().toArray();

    client.close();
    console.log("disconnected!");
    return res.status(200).json({ status: 200, factors: factors });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

// function to add a custom to existing list of planning factors
const addFactor = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");
    console.log(req.body);
    const query = {};
    const newValues = { $set: { ...req.body } };
    await db.collection("factors").updateOne(query, newValues);

    return res.status(200).json({ status: 200, message: "Factor added" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

// function to add a new user
const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");
    await db
      .collection("users")
      .insertOne({ name: req.body.name, email: req.body.email, delete: false });

    return res.status(201).json({ status: 201, message: "User added" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

// function to add a SOwhat
const addSoWhat = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");
    await db.collection("SOwhats").insertOne(req.body);

    return res.status(201).json({ status: 201, message: "SOwhat added" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  getFactor,
  addUser,
  addSoWhat,
  addFactor,
};
