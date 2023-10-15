import React from "react";
import { Navbar } from "../components";
import img1 from '../images/profile.jpg'
export default function CreditDashboard() {
  return (
    <div>
      <Navbar />
      <div className="font-roboto flex flex-col bg-[#5B8FB9] text-white text-2xl h-screen">
        <div className="grid grid-cols-2 mt-[5%] border-black border-b text-black">
          <div>
          <img src={img1} alt="" className="h-[15vh] ml-[4%]"/>
          </div>
          
          <div>
            Name : Rohan Kadam
            <br />
            University: Mumbai University
            <br />
            Wallet Address: 1234
          </div>
        </div>
        <div className="container mx-auto p-6 w-[50%] mt-[4%]">
          <div className="bg-white p-6 rounded-xl text-black">
            <div className="mb-8 text-3xl font-bold text-center">
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
