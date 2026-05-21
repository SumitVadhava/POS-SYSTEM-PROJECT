const billsModel = require("./../models/BillsModel");

// add bill
const addBillsController = async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    await newBill.save();
    res.send("Bill Created Successfully!");
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
};

const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.send(bills);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to fetch bills");
  }
};

const deleteBillController = async (req, res) => {
  try {
    const { billId } = req.body;
    await billsModel.findByIdAndDelete(billId);
    res.send("Bill deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to delete bill");
  }
};

const updateBillController = async (req, res) => {
  try {
    const { billId, ...updateData } = req.body;
    await billsModel.findByIdAndUpdate(billId, updateData, { new: true });
    res.send("Bill updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to update bill");
  }
};

module.exports = {
  addBillsController,
  getBillsController,
  deleteBillController,
  updateBillController,
};