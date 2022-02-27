const User = require("./userModel");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).send({user: newUser});
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
};


exports.findUser = async (req, res) => {
  try {
      const returnedUser = await User.find({ username: req.body.username });
      res.status(200).send({ returnedUser });
  } catch (error) {
      console.log(error);
      res.status(404).send({ error: "Unable to locate user." });
  }
};


exports.updateAgent = async (req, res) => {
  try {
      if (req.body.newPassword) {
          let updatedAgent = await Agent.findOneAndUpdate(
              { username: req.body.username },
              { password: req.body.newPassword },
              { new: true }
          );
          res.status(200).send({
              message: `Agent ${updatedAgent.username} updated with new password.`,
          });
      } else if (req.body.newEmail) {
          let updatedAgent = await Agent.findOneAndUpdate(
              { username: req.body.username },
              { email: req.body.newEmail },
              { new: true }
          );
          res.status(200).send({
              message: `Agent ${updatedAgent.username} updated with new email address.`,
          });
      } else if (req.body.newUsername) {
          let updatedAgent = await Agent.findOneAndUpdate(
              { username: req.body.username },
              { username: req.body.newUsername },
              { new: true }
          );
          res.status(200).send({
              message: `Agent ${updatedAgent.username} updated with new username.`,
          });
      } else {
          res.status(404).send({
              error: "Cannot find the specified agent to update.",
          });
      }
  } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
      const deletedUser = await User.findOneAndDelete({
          username: req.body.username,
      });
      res.status(200).send(`User ${deletedUser.username} deleted.`);
  } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
  }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const newUser = await User.findOne({ email });
      if (newUser) {
        const validPassword = await bcrypt.compare(password, newUser.password);
        if (validPassword) {
          res.status(200).send({message: "Login was successful"})
        } else {
          res.status(500).send({message: "Incorrect password"})
        }
      } else {
        res.status(500).send({message: "Entered wrong email"})
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({error: error.message})
    }
  };