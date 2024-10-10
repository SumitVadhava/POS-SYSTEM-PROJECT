const express = require("express");
const {
  addBillsController,
  getBillsController,
} = require("./../controllers/billsControllers");

const router = express.Router();

//routes

//MEthod - POST
router.post("/add-bills", addBillsController);

//MEthod - GET
router.get("/get-bills", getBillsController);

module.exports = router;