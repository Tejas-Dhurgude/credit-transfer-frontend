import React from 'react'
import { Navbar } from "../components";
import { useEffect,useState } from 'react';
import {ethers} from 'ethers';
import { FileHashABI,FileHashAddress } from "../utils/constants/constants_FileHash";

const SheetList = () => {
  const [sheetList, setSheetList] = useState([]);
  useEffect(() => {
    const getSheetList = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const userContract = new ethers.Contract(FileHashAddress, FileHashABI, signer);
      const gasLimit = 1000000;
      const tx = await userContract.getFiles({gasLimit:gasLimit});
      console.log(tx);
      setSheetList(tx);

    };
    getSheetList();
  }, []);
  return (
    <>
         <div>
      <div className="bg-yellow-100 min-h-screen">
        <Navbar />
        <center>
          <table className="border border-collapse mt-8 rounded-lg shadow-lg w-[60%]">
            <thead>
              <tr>
                <th className="p-2 font-bold bg-purple-500 text-white">
                  University Code
                </th>
                <th className="p-2 font-bold bg-purple-500 text-white">
                  Student UID
                </th>
                <th className="p-2 font-bold bg-purple-500 text-white">
                  MarkSheet
                </th>
              </tr>
            </thead>
            <tbody>
              {sheetList.map((sheet) => (
                <tr>
                  <td className="p-2 border border-purple-500">
                    {sheet.code}
                  </td>
                  <td className="p-2 border border-purple-500">
                    {sheet.uid}
                  </td>
                  <td className="p-2 border border-purple-500">
                    <button  
                      onClick={(e)=>{
                        e.preventDefault();
                        localStorage.setItem('path',sheet.filehash);
                        window.open('/viewmarksheet','_blank');
                      
                      }}
                    >View Marksheet</button>
                  </td>
                </tr>
              ))}


            </tbody>
          </table>
        </center>
      </div>
    </div>
    </>
  )
}

export default SheetList