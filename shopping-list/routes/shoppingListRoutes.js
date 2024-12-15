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
router.get("/lists/archived", getArchivedLists);
router.get("/list/:listID", getListById);
router.post("/create", addList);
router.put("/update/:listID", updateList);
router.delete("/delete/:listID", deleteList);

module.exports = router;