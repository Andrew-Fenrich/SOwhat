const express = require("express");
const morgan = require("morgan");
const { getUsers, getFactor, getUser } = require("./handlers");

const PORT = process.env.PORT || 8000;
// const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  //   .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  // Endpoint to get all current users
  .get("/users", getUsers)
  // Endpoint to get a single current user
  .get("/users/:email", getUser)
  //endpoint to get planning factors
  .get("/factors", getFactor)

  //Catch All Endpoint
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "Sorry an error has occured",
    });
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
