const { v4: uuidV4 } = require('uuid');

const { setUser } = require('../service/auth');
const User = require('../models/user');

const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = setUser(user);
  res.cookie('token', token);
  // return res.json({ token });
  return res.redirect('/');
};

const handleUserLogIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.redirect('/login');
  }
  const token = setUser(user);
  res.cookie('token', token);
  // res.json({ token });
  return res.redirect('/');
};

module.exports = {
  handleUserSignUp,
  handleUserLogIn,
};
