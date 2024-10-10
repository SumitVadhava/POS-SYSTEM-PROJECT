const mongoose = require("mongoose");
const dotenv = require("dotenv");
const database = require('./Server/config/database');
const itemModel = require("./Server/models/itemsModel");
const items = require("./server/utils/data");
require("colors");

dotenv.config();
database();

//function seeder
const importData = async () => {
  try {
    await itemModel.deleteMany();
    const itemsData = await itemModel.insertMany(items);
    console.log("All Items Added Successfully");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

importData();