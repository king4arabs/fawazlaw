const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require("../models/Admin");

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("email and password: ", email, password);

  try {
    // Find the admin in the database
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).send('Admin not found.');
    }

    // Compare the entered password with the stored hashed password
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).send('Incorrect password.');
    }

    // Generate a token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
};

exports.logout = (req, res) => {
  // Generate a new token with a very short expiration time
  const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1m' });

  // Send the new token to the client
  res.json({ token });}