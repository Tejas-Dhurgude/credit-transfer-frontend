
import React from "react";
import { Navbar } from "../components";
import { useState } from "react";
import { ethers } from "ethers";
import {
  InstituteandStudentABI,
  InstituteandStudentAddress,
} from "../utils/constants/constants_SI.js";

const StudentRegister = () => {
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
    } else {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const userContract = new ethers.Contract(
          InstituteandStudentAddress,
          InstituteandStudentABI,
          signer
        );
        const gasLimit = 1000000;
        const tx = await userContract.addStudent(name, uid, password, {
          gasLimit: gasLimit,
        });
        await tx.wait();
        console.log(tx);
        alert("Student Registered Successfully");
      } catch (error) {
        alert("Error in Registering Student");
      }
    }
  };
  return (
    <>
      <div className="bg-img-student h-screen bg-cover">
        <Navbar />
        <div className="flex flex-col justify-center bg-slate-200 max-w-fit rounded-lg m-32 p-8 h-[50%]">
          <div className="m-2 grid grid-cols-2">
            <label className="text-xl font-semibold mr-2">Student Name</label>
            <input
              type="text"
              className="border-2"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="m-2 grid grid-cols-2">
            <label className="text-xl font-semibold mr-2">
              Student UID number
            </label>
            <input
              type="text"
              className="border-2"
              onChange={(e) => setUid(e.target.value)}
            />
          </div>
          <div className="m-2 grid grid-cols-2">
            <label className="text-xl font-semibold mr-2">Password </label>
            <input
              type="password"
              className="border-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="m-2 grid grid-cols-2">
            <label className="text-xl font-semibold mr-2">
              Confirm Password{" "}
            </label>
            <input
              type="password"
              className="border-2"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="m-2">
            <button
              className="bg-slate-400 text-lg p-2 rounded-lg hover:bg-slate-200"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentRegister;
