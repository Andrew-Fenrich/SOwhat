const express = require("express");
const morgan = require("morgan");

// const PORT = process.env.PORT || 8000;
const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  //   .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  //Catch All Endpoint

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "Sorry an error has occured",
    });
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
