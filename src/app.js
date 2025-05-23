const bcrypt = require("bcryptjs");

const express = require("express");
const app = express();

const connectDb = require("./config/database");
const User = require("../models/user");
const { validateSignUPSchema } = require("./helpers/validation");

const jwt = require("jsonwebtoken");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //Validation of data
  try {
    validateSignUPSchema(req);

    //Encrypt the Password
    const { firstName, lastName, email, password } = req.body;
    console.log("checking my request body ", req.body);

    const hashPassword = await bcrypt.hash(password, 10);

    //Creating a new instance of the User Model

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const savedUser = await user.save();

    const payload = {
      user: {
        user: savedUser._id,
      },
    };

    //Implementation of jwt

    jwt.sign(
      payload,
      "ridgdfdkklgdfgjldg",
      { expiresIn: "10h" },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          user: {
            _id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
          },
          token,
        });
      }
    );

    
  } catch (error) {
    res.send("something went wrong" + error.message);
    console.log("something went wrong" + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email is not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password is not Matched");
    }
    return res.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    console.log("Somnethign went wrong" + error);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const users = await User.find({ email: userEmail });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send("something went wrong" + error);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    console.log("We found an error ", error);
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleter successfullyy");
  } catch (error) {
    console.log("We found an error ", error);
  }
});
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("User deleter successfullyy");
  } catch (error) {
    console.log("We found an error " + error);
  }
});

connectDb()
  .then(() => {
    console.log("database connected successfully");
    app.listen(3000, () => {
      console.log("server on listening on port no. 3000");
    });
  })
  .catch((err) => {
    console.log("something went wrong", err);
  });
