import React from "react";
import "./upload_marksheet.css";
import { Navbar } from "../components";
import { useState } from "react";
import { create } from 'ipfs-http-client';
import {Buffer} from 'buffer';
import {ethers} from 'ethers';
import { FileHashABI,FileHashAddress } from "../utils/constants/constants_FileHash";
import { InstituteandStudentABI,InstituteandStudentAddress } from '../utils/constants/constants_SI.js'
import Papa from 'papaparse';


const UploadMarksheet = () => {
  const [studentUID, setStudentUID] = useState("");
  const [instituteCode, setInstituteCode] = useState("");
  const [file, setFile] = useState(null);

  const submitHandler = async(e) => {
    e.preventDefault();

    const reader = new FileReader();
    var _credits = 0;



      // Convert the CSV data to JSON using PapaParse
      Papa.parse(file, {
        header: true, // Assumes the first row contains headers
        complete: (result) => {
          // Log the JSON data
          console.log(result.data);
          

        result.data.forEach((item) => {
          if (item.credits) {
            const single_credit = parseFloat(item.credits);
            if (!isNaN(single_credit)) {
              _credits += single_credit;
            }
          }
          
        });
        console.log("total credits:", _credits);


        }
      });
   

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const userContract1 = new ethers.Contract(InstituteandStudentAddress, InstituteandStudentABI, signer);
      const gasLimit = 1000000;

      
      const tx = await userContract1.addStudentCredit( studentUID, _credits,{gasLimit:gasLimit});
      await tx.wait();
      console.log(tx);
      alert('Credits uploaded successfully')

      
    } catch (error) {
      alert('Error in Registering Institute')
    }
    
    reader.readAsText(file);

    
    const auth = 'Basic ' + Buffer.from('2VIoqwW3bEyMIFuuoZ9z9eZTdxj' + ':' + '2bc181af8d48b95b19e14854d564a881').toString('base64')
    const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth } })
    const added = await client.add(file)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const userContract = new ethers.Contract(FileHashAddress, FileHashABI, signer);
      const gasLimit = 1000000;
      const tx = await userContract.addFile(studentUID,instituteCode,added.path,{gasLimit:gasLimit});
      console.log(tx);
      alert('File Uploaded Successfully')
  };

  return (
    <div>
      <Navbar/>

      <div className="container">
        <div className="wrapper">
          <form action="#">
          <label className="text-xl font-semibold mr-2">
              Student UID
            </label>
            <input
              type="text"
              className="border-2 border-black"
              onChange={(e) => setStudentUID(e.target.value)}
              />
            <label className="text-xl font-semibold mr-2">
              Institute Code:
            </label>
            <input
              type="text"
              className="border-2 border-black"
              onChange={(e) => setInstituteCode(e.target.value)}
              />
              <label className="text-xl font-semibold mr-2">
              File Upload
            </label>
            <input
              type="file"
              className="border-2 border-black"
              onChange={(e) => setFile(e.target.files[0])}
              />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded"
              onClick={submitHandler}
              >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMarksheet;
