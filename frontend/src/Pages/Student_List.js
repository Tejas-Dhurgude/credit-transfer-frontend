import React from "react";
import { Navbar } from "../components";

export default function StudentList() {
  return (
    <div>
      <div className="bg-yellow-100 min-h-screen">
        <Navbar />
        <center>
          <table className="border border-collapse mt-8 rounded-lg shadow-lg w-[60%]">
            <thead>
              <tr>
                <th className="p-2 font-bold bg-purple-500 text-white">
                  Student Name
                </th>
                <th className="p-2 font-bold bg-purple-500 text-white">
                  Student UID
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 hover:bg-gray-200 transition duration-300">
                <td className="p-2">Rohan</td>
                <td className="p-2">44</td>
              </tr>
              <tr className="bg-gray-100 hover:bg-gray-200 transition duration-300">
                <td className="p-2">Ramesh</td>
                <td className="p-2">34</td>
              </tr>
              {/* Use arr.map() and return this component to display your entire array of name and code */}
            </tbody>
          </table>
        </center>
      </div>
    </div>
  );
}
