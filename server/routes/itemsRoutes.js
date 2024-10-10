const express = require('express')
const {getItemController,addItemController,editItemController,deleteItemController} = require("../controllers/itemControllers");
const router =express.Router();

// routes 

//get items
router.get('/get-item',getItemController);

// add items
router.post('/add-item',addItemController);

//update items
router.put("/edit-item",editItemController);

//method - DELETE
router.post("/delete-item", deleteItemController);


module.exports = router;