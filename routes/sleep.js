const express = require("express");
const {
  newRecord,
  getRecords,
  deleteRecord,
} = require("../controllers/sleepController");
const router = express.Router();

router.post("/", newRecord);
router.get("/:userId", getRecords);
router.delete("/:recordId", deleteRecord);

module.exports = router;
