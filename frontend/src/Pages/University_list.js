import React from "react";
import { Navbar } from "../components";
import { useEffect,useState } from "react";
import { ethers } from "ethers";
import { InstituteandStudentABI,InstituteandStudentAddress } from '../utils/constants/constants_SI.js'


export default function Universitylist() {
  const [universityList, setUniversityList] = useState([]);
  useEffect(() => {
    const getUniversityList = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const userContract = new ethers.Contract(InstituteandStudentAddress, InstituteandStudentABI, signer);
        const gasLimit = 1000000;
        const tx = await userContract.getAllInstitutes({gasLimit:gasLimit});
        setUniversityList(tx);

        
      } catch (error) {
        alert("Check your credentials")
        
      }
    };
   getUniversityList();
  }, []);
  return (
    <div className="bg-yellow-100 min-h-screen"> 
      <Navbar />
      <center>
        <table className="border border-collapse mt-8 rounded-lg shadow-lg w-[60%]"> 
          <thead>
            <tr>
              <th className="p-2 font-bold bg-blue-500 text-white">University Name</th>
              <th className="p-2 font-bold bg-blue-500 text-white">University Code</th>
            </tr>
          </thead>
          <tbody>
           {universityList.map((university) => (
            <tr className="bg-gray-100 hover:bg-gray-200 transition duration-300">
              <td className="p-2">{university.name}</td>
              <td className="p-2">{university.code}</td>
            </tr>
           ) )}
          </tbody>
        </table>
      </center>
    </div>

  );
}