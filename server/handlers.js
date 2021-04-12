const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;
console.log(MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  console.log(client);
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

module.exports = {
  getUsers,
};
