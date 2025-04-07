const express = require("express");
const app = express();

const connectDb = require("./config/database");

connectDb()
  .then(() => {
    console.log("database connected successfully");
    app.listen(() => {
      console.log("server on listening on port no. 7777");
    });
  })
  .catch((err) => {

    console.log("something went wrong" , err)
  });
