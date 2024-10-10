import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Modal, Button, Table, Form, Input, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ItemPage = () => {

  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Fetch all items
  const getAllItems = async () => {
    try {
      
      const { data } = await axios.get("/items/get-item");
      setItemsData(data);
      
    } catch (error) {
      
      console.log(error);
      message.error("Failed to fetch items");
    }
  };

  // useEffect to load items
  useEffect(() => {
    getAllItems();
  }, []);

  // Handle delete item
  const handleDelete = async (record) => {
    try {
     
      await axios.post("/items/delete-item", { itemId: record._id });
      message.success("Item Deleted Successfully");
      getAllItems();
     
    } catch (error) {
     
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  // Define table columns
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Edit",
      dataIndex: "_id",
      render: (id, record) => (
        <div >
          <EditOutlined
            style={{ cursor: "pointer", marginRight: 16 }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <DeleteOutlined
            style={{ cursor: "pointer",}}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  // Handle form submission
  const handleSubmit = async (value) => {
    try {
      
      if (editItem === null) {
        // Add new item
        await axios.post("/items/add-item", value);
        message.success("Item Added Successfully");
      } else {
        // Edit existing item
        await axios.put("/items/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item Updated Successfully");
      }
      getAllItems();
      setPopupModal(false);
    } catch (error) {
      message.error("Something Went Wrong");
      console.log(error);
    } 
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1 style={{fontFamily:'Montserrat', fontWeight:'-moz-initial'}}>List Of Products</h1>
        <Button style={{marginBottom:'15px'}}type="primary" onClick={() => setPopupModal(true)}>
          Add Item
        </Button>
      </div>

      <Table columns={columns} dataSource={itemsData} bordered />

      {popupModal && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          visible={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter item name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter item price' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="image" label="Image URL" rules={[{ required: true, message: 'Please enter image URL' }]}>
              <Input />
            </Form.Item>
         

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;
