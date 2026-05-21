const express = require("express");
const {
  addBillsController,
  getBillsController,
} = require("./../controllers/billsControllers");

const router = express.Router();

// Method - POST
router.post("/add-bills", addBillsController);

//Method - GET
router.get("/get-bills", getBillsController);

module.exports = router;