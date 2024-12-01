const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../models/userModel");
const { registerSchema, loginSchema } = require("../validations/authValidation");

const JWT_SECRET = "your_secret_key";

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "Username already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ message: "Login successful", token });
};

module.exports = { register, login };