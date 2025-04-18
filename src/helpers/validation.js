
const validator = require('validator');


const validateSignUPSchema = (req,res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName) {
      throw new Error("Usename Should be in between 4-30 ");
    } else if (!validator.isEmail(email))
      throw new Error(
        "Email length is required, You email is not follow industry practise"
      );
    else if (!validator.isStrongPassword(password)) {
      throw new Error("Password length is requires");
    }
  } catch (error) {
    console.log(error)
    res.send("message" +  error)
  }
};

module.exports = {
    validateSignUPSchema,
};
