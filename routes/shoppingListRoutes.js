const express = require("express");
const {
  getAllLists,
  getListById,
  addList,
  updateList,
  deleteList,
  getArchivedLists
} = require("../controllers/shoppingListController");

const router = express.Router();

router.get("/lists", getAllLists);
router.get("/lists/archived", getArchivedLists);
router.get("/list/:listID", getListById);
router.post("/add", addList);
router.put("/update/:listID", updateList);
router.delete("/delete/:listID", deleteList);

module.exports = router;