const jwt = require('jsonwebtoken');
const serect = 'Sai#123!@';
function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    serect
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, serect);
  } catch (error) {
    return null;
  }
}

module.exports = { setUser, getUser };
