import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { EyeOutlined, EditOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Modal, Table, Button, message } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./../Styles/InvoiceStyle.css";

const BillsPage = () => {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      const { data } = await axios.get("/bills/get-bills");
      setBillsData(data);
    } catch (error) {
      // Error handling without verbose console logging
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const downloadInvoice = () => {
    const input = componentRef.current;
    html2canvas(input, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 200;
      const imgProps = {
        width: canvas.width,
        height: canvas.height,
      };
      const ratio = (pdfWidth * 3.78) / imgProps.width;
      const pdfHeight = imgProps.height * ratio;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${selectedBill._id}.pdf`);
    });
  };

  const handleEdit = (record) => {
    message.info(`Edit clicked for ${record.customerName} (ID: ${record._id})`);
  };

  const handleDelete = async (record) => {
    try {
      if (window.confirm("Are you sure you want to delete this bill?")) {
        await axios.post("/bills/delete-bill", { billId: record._id });
        message.success("Bill deleted successfully");
        getAllBills();
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to delete the bill");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "_id" },
    { title: "Customer Name", dataIndex: "customerName" },
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: "Subtotal", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div style={{ display: "flex", gap: "10px", fontSize: "18px" }}>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
          <EditOutlined
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            style={{ cursor: "pointer", color: "#ff4d4f" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between mb-3">
        <h1>Invoice List</h1>
      </div>

      <Table columns={columns} dataSource={billsData} bordered rowKey="_id" />

      {popupModal && selectedBill && (
        <Modal
          width={400}
          title="Invoice Details"
          open={popupModal}
          onCancel={() => setPopupModal(false)}
          footer={[
            <Button key="close" onClick={() => setPopupModal(false)}>
              Close
            </Button>,
            <Button
              key="download"
              type="primary"
              icon={<DownloadOutlined />}
              onClick={downloadInvoice}
            >
              Download Invoice
            </Button>,
          ]}
        >
          <div
            id="invoice-POS"
            ref={componentRef}
            style={{ padding: "10px", background: "#fff", width: "270px" }}
          >
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>Freshmart POS</h2>
                <p>Contact: 1234567890 | Rajkot</p>
              </div>
            </center>

            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name: <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No: <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date: <b>{selectedBill.date?.substring(0, 10)}</b>
                  <br />
                </p>
                <hr />
              </div>
            </div>

            <div id="bot">
              <div id="table">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr className="tabletitle">
                      <td>
                        <h2>Item</h2>
                      </td>
                      <td>
                        <h2>Qty</h2>
                      </td>
                      <td>
                        <h2>Price</h2>
                      </td>
                      <td>
                        <h2>Total</h2>
                      </td>
                    </tr>

                    {selectedBill.cartItems.map((item, index) => (
                      <tr key={index} className="service">
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity * item.price}</td>
                      </tr>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td>
                        <h2>Tax</h2>
                      </td>
                      <td>
                        <h2>Rs.{selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td>
                        <h2>Total</h2>
                      </td>
                      <td>
                        <h2>Rs.{selectedBill.totalAmount}</h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                id="legalcopy"
                style={{ marginTop: "10px", fontSize: "10px" }}
              >
                <p>
                  <strong>Thank you!</strong> 10% GST applied. This is
                  non-refundable.
                  <br />
                  For help: <b>freshmarthelp@gmail.com</b>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
