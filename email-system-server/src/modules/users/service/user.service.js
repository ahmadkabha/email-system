const User = require('../model/user.model');
const bcrypt=require('bcryptjs')
async function createUser(userData) {
  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  userData.password = hashedPassword;

  const user = new User(userData);
  return await user.save();
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

async function authenticateUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
}

module.exports = {
  createUser,
  findUserByEmail,
  authenticateUser,
};
