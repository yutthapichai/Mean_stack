const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


exports.userLogin = (req, res, next) => {
  let fetcheduser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(401).json({ message: "don't have an email" });
      } else {
        fetcheduser = user;
        return bcrypt.compare(req.body.password, user.password);
      }
    })
    .then(result => {
      if (!result) {
        res.status(401).json({ message: "password don't match" });
      } else {
        const token = jwt.sign(
          { email: fetcheduser.email, userId: fetcheduser._id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetcheduser._id
        });
      }
    })
    .catch(err => {
      return res.status(500).json({ message: err });
    });
};


exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(result => {
      if (result) {
        res.status(401).json({ message: "Have an email please new email" });
      } else {
        bcrypt.hash(req.body.password, 10).then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash
          });
          user.save().then(result => {
            res.json({
              massage: "User created",
              result: result
            });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};
