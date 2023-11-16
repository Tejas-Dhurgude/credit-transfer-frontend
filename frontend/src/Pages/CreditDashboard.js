import React from "react";
import { useEffect,useState } from "react";

import { Navbar } from "../components";
import { ethers } from "ethers";
import {
  InstituteandStudentABI,
  InstituteandStudentAddress,
} from "../utils/constants/constants_SI.js";
import img1 from "../images/profile.jpg";

export default function CreditDashboard() {
  const [studentDetails, setStudentDetails] = useState({
    name: "data not fetched",
    walletAddress: "",
    instituteCode: [],
    credit: 0,
  });


  
  useEffect(() => {
    const onSub = async () => {

      var uid = localStorage.getItem("uid");

      
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
        
        const studentData = await userContract.getStudentInfo( uid, {
          gasLimit: gasLimit,
      });

      console.log(studentData);

      // s[j].name, s[j].password, s[j].walletAddress, s[j].instituteCode, s[j].credits
      
      setStudentDetails({
        name: studentData[0],
        walletAddress: studentData[2],
        instituteCode: studentData[3],
        credit: studentData[4].toNumber(),
      });
      } catch (error) {
        console.error("Error fetching student information:", error);
        alert("Unable to  show your Credits");
      }

      

    };

    onSub();
  }, []);
  

  return (
    <div className="bg-gradient-to-r from-yellow-200 to-yellow-100 min-h-screen">
      <Navbar />
      <div className="font-roboto flex flex-col bg-white text-gray-800 text-2xl h-screen shadow-lg rounded-lg mx-8 my-4 p-8">
        <div className="grid grid-cols-2 gap-8 items-center mb-8">
          <div className="flex justify-center">
            <img
              src={img1}
              alt="Profile"
              className="h-32 w-32 rounded-full shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Name: {studentDetails.name}</h2>
            <h2 className="text-3xl font-bold mb-2">Uid: {localStorage.getItem("uid")} </h2>
            <p className="mb-2">Wallet Address: {studentDetails.walletAddress}</p>
            <p className="mb-2">Credit: {studentDetails.credit}</p>
            {/* button */}

            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <a href="/universityapply">Apply for university</a>
              </button>
          </div>

          </div>

          
        
        {/* <div className="bg-white p-6 rounded-xl text-black">
          <div className="mb-4 text-3xl font-bold text-center">
            Credit Dashboard
          </div>
          <table className="w-full">
            <thead className="border-b-2 border-blue-900">
              <tr className="text-left">
                <th className="py-2 pr-2 w-1/2">Course</th>
                <th className="text-center">Credits</th>
              </tr>
            </thead>
            <tbody>
              <tr className=" ">
                <td className="py-2 pr-2">Physics</td>
                <td className="text-center">3/4</td>
              </tr>
              <tr className=" ">
                <td className="py-2 pr-2">Maths</td>
                <td className="text-center">4/4</td>
              </tr>
              <tr className="">
                <td className="py-2 pr-2">Chemistry</td>
                <td className="text-center">3/4</td>
              </tr>
              <tr className="">
                <td className="py-2 pr-2">Java</td>
                <td className="text-center">4/4</td>
              </tr>
            </tbody>
          </table>*/}
        </div>
      </div>  
    </div>
  );
}

