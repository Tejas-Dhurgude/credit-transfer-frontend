import React, { useState } from "react";
import { Navbar } from "../components";

const Nad = () => {
  const [search, setSearch] = useState("");
  const transferRequests = [
    {
      sender: "John Doe",
      recipient: "Jane Smith",
      amount: "1000",
      description: "Expense reimbursement",
    },
    {
      sender: "Roy Smith",
      recipient: "Jane Smith",
      amount: "64",
      description: "Credit Transfer",
    },
  ];

  const handleApprove = () => {
    alert("Transfer Approved");
  };

  return (
    <div className="bg-yellow-100 min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold text-center m-4">NAD Portal</h1>

      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-2 border rounded border-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {transferRequests
          .filter((request) =>
            request.sender.toLowerCase().includes(search.toLowerCase())
          )
          .map((request, index) => (
            <div
              key={index}
              className="w-full max-w-md p-6 bg-white rounded-md shadow-md"
            >
              <h1 className="text-2xl font-semibold mb-4">Transfer Approval</h1>

              <div className="mb-4">
                <p>
                  You have received a transfer request from{" "}
                  <span className="font-semibold">{request.sender}</span>:
                </p>
              </div>

              <div className="mb-4">
                <p>
                  <strong>Recipient:</strong> {request.recipient}
                </p>
                <p>
                  <strong>Credit Amount:</strong> {request.amount}
                </p>
                <p>
                  <strong>Description:</strong> {request.description}
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={handleApprove}
                >
                  Approve
                </button>
                <button className="bg-red-500 hover-bg-red-600 text-white font-semibold py-2 px-4 rounded">
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Nad;
