import React from "react";
import { Navbar } from "../components";
import img1 from "../images/profile.jpg";

export default function CreditDashboard() {
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
            <h2 className="text-3xl font-bold mb-2">Rohan Kadam</h2>
            <p className="mb-2">University: Mumbai University</p>
            <p>Wallet Address: 1234</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl text-black">
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
          </table>
        </div>
      </div>
    </div>
  );
}
