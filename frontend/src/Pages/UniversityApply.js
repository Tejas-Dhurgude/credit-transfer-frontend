import React, { useState } from "react";
import { Navbar } from "../components";
import img2 from "../images/myProfile.jpg";
import img3 from "../images/searchButton.png";
import { ethers } from "ethers";
import {
  InstituteandStudentABI,
  InstituteandStudentAddress,
} from "../utils/constants/constants_SI.js";

export default function UniversityApply() {
  const [search, setSearch] = useState("");
  const names = [
    "Other Univeristy",
    "Other Univeristy 2",
  ];

  const creditsRequired = [
    6,
    10,
  ]

  const filteredUniversities = names.filter(university =>
    university.toLowerCase().includes(search.toLowerCase())
  );

  const onApply = async (e,credits,university) => {
    e.preventDefault();
    console.log(credits);
    const uid = localStorage.getItem("uid");
    console.log(uid);
    const institueCode = "SPITMUM"
    const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const userContract = new ethers.Contract(
          InstituteandStudentAddress,
          InstituteandStudentABI,
          signer
        );
        const gasLimit = 1000000;
    const scredits  = await userContract.getStudentCredits(uid,{gasLimit});
    if (parseInt(scredits) < credits){
      alert("You don't have enough credits to apply for this university");
      return;
    }
    else{
      const tx = await userContract.sendTransferRequest(uid,institueCode,university,credits,{gasLimit});
      await tx.wait();
      alert("Your request has been sent !");
      window.location.href = "/NAD"
    }


  }

  return (
    <div>
      <Navbar />
      <>
        <main className="main  bg-yellow-100">
          <div className="flex justify-between">
            <div className="flex m-[5%] gap-8">
              <img src={img3} alt="Search Button" width="40px" height="40px" />
              <input
                className="border w-[50vw] p-2 rounded-lg"
                type="text"
                placeholder="Enter Name of University you want to search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filteredUniversities.map((university, index) => (
              <div
                key={index}
                className="ml-[5%] border-4 border-yellow-400 rounded-lg shadow-lg bg-white"
              >
                <div className="h-[30vh] overflow-hidden rounded-t-lg">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1536323760109-ca8c07450053"
                    alt={university}
                  />
                </div>
                <div className="card__details p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="tag text-green-600 ">Engineering</span>
                      <span className="tag text-blue-600">Masters</span>
                    </div>
                    <div className="text-gray-700">
                      <span>Credits Required: {
                        creditsRequired[index]
                        }</span>
                      <i className="fa fa-star text-yellow-500"></i>
                    </div>
                  </div>
                  <div className="name text-2xl font-semibold my-2 flex ">{university}</div>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
                    sodales morbi dignissim sed diam pharetra vitae ipsum odio.
                  </p>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    onClick={(e) => onApply(e,creditsRequired[index],university)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <footer className="footer">
          <h3>Contact Us</h3>
        </footer>
      </>
    </div>
  );
}
