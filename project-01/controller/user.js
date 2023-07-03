const User = require('../models/user');
const handleGetAllUsers = async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
};

const handleGetUserById = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
  return res.json(user);
};

const handleUpdateUserById = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {});
  return res.json('success');
};

const handleDeleteUserById = async (req, res) => {
  console.log(req.params.id);
  await User.findByIdAndDelete(req.params.id);
  res.json({ status: 'success' });
};

const handleCreateNewUser = async (req, res) => {
  const body = req.body;

  if (!body || !body.first_name || !body.gender || !body.email) {
    return res.status(400).json({ msg: 'All fields are req...' });
  }
  let status;
  try {
    status = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });
  } catch {
    return res.status(400).json({ msg: 'error' });
  }

  return res.status(201).json({ msg: 'success', id: status._id });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
