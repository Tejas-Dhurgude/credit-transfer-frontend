import React, { useState,useEffect } from "react";
import { Navbar } from "../components";
import { ethers } from "ethers";
import { InstituteandStudentABI,InstituteandStudentAddress } from '../utils/constants/constants_SI.js'

const Nad = () => {
  const [transferRequests, setTransferRequests] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const userContract = new ethers.Contract(InstituteandStudentAddress, InstituteandStudentABI, signer);
        const gasLimit = 1000000;
        const data = await userContract.getTransferReqeuests({gasLimit:gasLimit});
        //convert data to array
        const transferRequests = Object.keys(data).map((key) => data[key]);
        setTransferRequests(transferRequests);
        console.log(transferRequests);
    };
    fetchData();
  },[]);

  const [search, setSearch] = useState("");


  const handleuniApprove = async(e,uid,institueCode) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const userContract = new ethers.Contract(InstituteandStudentAddress, InstituteandStudentABI, signer);
        const gasLimit = 1000000;
        const tx = await userContract.getInsituteApproval(uid,institueCode,{gasLimit:gasLimit});
        await tx.wait();
        console.log(tx);
        alert("Approved by University")

  };

  const handleNADApprove = async(e,uid) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const userContract = new ethers.Contract(InstituteandStudentAddress, InstituteandStudentABI, signer);
        const gasLimit = 1000000;

        const tx = await userContract.getNADApproval(uid,{gasLimit:gasLimit});
        await tx.wait();
        console.log(tx);
        alert("Approved by NAD")
        const tx2 = await userContract.transferCredits(uid,{gasLimit:gasLimit});
        await tx2.wait();
        console.log(tx2);
        alert("Credits Transferred!! Congratulations you are enrolled in the new institute!! ")

  };

  return (
    <div className="bg-yellow-100 min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold text-center m-4">Approval Portal</h1>

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
          .map((transferRequest,index) => (
            <div
              key={index}
              className="w-full max-w-md p-6 bg-white rounded-md shadow-md"
            >
              <h1 className="text-2xl font-semibold mb-4">Transfer Approval</h1>

              <div className="mb-4">
                <p>
                  You have received a transfer request from{" "}
                  <span className="font-semibold"></span>: {transferRequest.studentUID}
                </p>
              </div>

              <div className="mb-4">
                <p>
                  <strong>Recipient:</strong> {transferRequest.otherinstituteCode}
                </p>
                <p>
                  <strong>Credit Amount:</strong> {parseInt(transferRequest.credits._hex)}
                </p>
                <p>
              
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={(e) => handleuniApprove(e,transferRequest.studentUID,transferRequest.instituteCode)}
                >
                  {transferRequest.hasCollegeApproved ? "Alreqdy Approved by University" : "Approve by univerity"}
                </button>
                <button className="bg-red-500 hover-bg-red-600 text-white font-semibold py-2 px-4 rounded"
                 onClick={(e) => handleNADApprove(e,transferRequest.studentUID)}
                >
                  {transferRequest.hasNADApproved ? "Already Approved by NAD" : "Approve by NAD"} 
                </button>
              </div>
            </div>
          ))}

          {/* map the transferRequests array here liek above */}
      </div>
    </div>
  );
};

export default Nad;
