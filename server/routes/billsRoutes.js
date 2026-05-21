const express = require("express");
const {
  addBillsController,
  getBillsController,
} = require("./../controllers/billsControllers");

const router = express.Router();

// Method - POST
router.post("/add-bills", addBillsController);
router.post("/delete-bill", deleteBillController);
router.post("/update-bill", updateBillController);

// Method - GET
router.get("/get-bills", getBillsController);

module.exports = router;