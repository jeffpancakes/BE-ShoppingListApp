const express = require("express");
const {
  getActiveLists,
  getArchivedLists,
  getListById,
  addList,
  updateList,
  deleteList
} = require("../controllers/shoppingListController");

const router = express.Router();

router.get("/lists", getActiveLists);
router.get("/lists/archived", getArchivedLists);
router.get("/list/:listID", getListById);
router.post("/add", addList);
router.put("/update/:listID", updateList);
router.delete("/delete/:listID", deleteList);

module.exports = router;