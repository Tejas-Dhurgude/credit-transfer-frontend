import React, { useState } from "react";
import { Navbar } from "../components";
import {ethers} from 'ethers';
import { InstituteandStudentABI,InstituteandStudentAddress } from '../utils/constants/constants_SI.js'


export default function InstituteLogin() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const onSub = async (e) => {
    e.preventDefault();
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const userContract = new ethers.Contract(InstituteandStudentAddress, InstituteandStudentABI, signer);
      const gasLimit = 1000000;
      const tx = await userContract.loginUniversity(code,password,{gasLimit:gasLimit});
      console.log(tx);
      alert('Logged in Successfully')
      
    } catch (error) {
      alert("Check your credentials")
    }

  };
  return (
    <div  className="bg-img-institute h-screen bg-cover ">
      <>
        <Navbar />
        <div className="flex flex-col justify-center bg-slate-200 max-w-fit rounded-lg m-32 p-8  mt-[15%]">
          <div className="m-2 grid grid-cols-2">
            <label className="text-xl font-semibold mr-2">
              Institute Code:
            </label>
            <input
              type="text"
              className="border-2"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="m-2 grid grid-cols-2">
            <label className="text-xl font-semibold mr-2">Password: </label>
            <input
              type="password"
              className="border-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="m-2">
            <button className="bg-slate-400 text-lg p-2 rounded-lg hover:bg-slate-200"
            onClick={onSub}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    </div>
  );
}
