const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const fs = require("fs");
const {
  getUsers,
  getFactor,
  getUser,
  addUser,
  addSoWhat,
  addFactor,
} = require("./handlers");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const PORT = process.env.PORT || 8000;
// const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  // below allows for a static upload of assets within the server file//
  .use("/", express.static(__dirname + "/"))

  // endpoint to get all current users
  .get("/users", getUsers)
  // endpoint to get a single current user
  .get("/users/:email", getUser)
  //endpoint to get planning factors
  .get("/factors", getFactor)
  //endpoint to patch and add new planning factor
  .patch("/factors", addFactor)
  //endpoint to add a new user
  .post("/users", addUser)
  //endpoint to upload user photo
  .post("/uploadUserAvatar", upload.single("avatar"), async (req, res) => {
    //fileType variable is the type of image file
    let fileType = req.file.mimetype.split("/")[1];
    // newFileName is the name of the file and the file type to be shared in the
    let newFileName = req.file.filename + "." + fileType;
    // This function renames the newly uploaded image files
    fs.rename(
      `./uploads/${req.file.filename}`,
      `./uploads/${newFileName}`,
      function () {
        console.log("image uploaded");
      }
    );
    // The Following uploads/adds the newImage path to the user
    const client = await MongoClient(MONGO_URI, options);
    try {
      await client.connect();
      const db = client.db();
      console.log("connected!");
      const email = req.body.email;
      console.log(email);
      const query = { email };
      const newValues = { $set: { imgUrl: `/uploads/${newFileName}` } };
      let results = await db.collection("users").updateOne(query, newValues);

      return res
        .status(201)
        .json({ status: 201, message: "Upload successful" });
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ status: 500, message: err.message });
    }
  })
  //endpoint to add SOwhat
  .post("/SOwhat", addSoWhat)

  //Catch All Endpoint
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "Sorry an error has occured",
    });
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
