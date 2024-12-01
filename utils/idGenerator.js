const { v4: uuidv4 } = require("uuid");

function generateRandomId() {
  return Array(24)
    .fill(null)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

function generateUuidWithoutDashes() {
  return uuidv4().replace(/-/g, "");
}

module.exports = { generateRandomId, generateUuidWithoutDashes };