import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Table } from "antd";

const CutomerPage = () => {
  const [billsData, setBillsData] = useState([]);

  const getAllBills = async () => {
    try {

      const { data } = await axios.get("/bills/get-bills");
      setBillsData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect
  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    { title: "ID ", dataIndex: "_id" },
    {
      title: "Cutomer Name",
      dataIndex: "customerName",
    },
    { title: "Contact No", dataIndex: "customerNumber" },
  ];

  return (
    <DefaultLayout>
      <h1>Cutomer Page</h1>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />
    </DefaultLayout>
  );
};

export default CutomerPage;