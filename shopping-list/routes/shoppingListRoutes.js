const express = require("express");
const {
  getActiveLists,
  getArchivedLists,
  getListById,
  addList,
  updateList,
  deleteList
} = require("../controllers/shoppingListController");
const authenticateToken = require("../utils/authMiddleware");

const router = express.Router();

router.get("/lists", getActiveLists);
router.get("/lists/archived", authenticateToken, getArchivedLists);
router.get("/list/:listID", authenticateToken, getListById);
router.post("/add", authenticateToken, addList);
router.put("/update/:listID", authenticateToken, updateList);
router.delete("/delete/:listID", authenticateToken, deleteList);

module.exports = router;