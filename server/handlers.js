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

//function to soft delete User
const deleteUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const email = req.params.email;
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");
    const user = await db.collection("users").findOne({ email: email });
    const query = { email };
    const newValues = { $set: { delete: !user.delete } };
    await db.collection("users").updateOne(query, newValues);
    client.close();
    console.log("disconnected!");
    if (user.delete === false) {
      return res.status(202).json({ status: 202, message: "User Deleted" });
    } else {
      return res.status(202).json({ status: 202, message: "User reAdded" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
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

// function to get all user SOwhats
const getUserSOwhat = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");
    const userId = req.params.userId;
    const soWhats = await db.collection("SOwhats").find({ userId }).toArray();
    client.close();
    console.log("disconnected!");
    return res.status(200).json({ status: 200, SOwhats: soWhats });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

// function to delete a SOwhat

const deleteSOwhat = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  let _id = req.params._id;
  console.log(_id);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const result = await db.collection("SOwhats").findOne(ObjectID(_id));
    console.log(result);

    await db.collection("SOwhats").deleteOne(result);

    client.close();
    console.log("disconnected!");

    return res.status(200).json({ status: 200, message: "SOwhat Deleted" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};
// function to patch(star: mark as important) a SOwhat
const starSoWhat = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const _id = ObjectID(req.params._id);
  try {
    await client.connect();
    const db = client.db();
    console.log("connected!");
    const soWhat = await db.collection("SOwhats").findOne(_id);
    const query = { _id };
    const newValues = { $set: { flag: !soWhat.flag } };
    await db.collection("SOwhats").updateOne(query, newValues);
    client.close();
    console.log("disconnected!");
    if (soWhat.flag === false) {
      return res.status(202).json({ status: 202, message: "So What Flagged" });
    } else {
      return res
        .status(202)
        .json({ status: 202, message: "So What DeFlagged" });
    }
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
  getUserSOwhat,
  deleteSOwhat,
  deleteUser,
  starSoWhat,
};
