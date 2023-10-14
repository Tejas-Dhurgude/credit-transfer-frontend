import React from 'react'
import  { Navbar } from '../components'
import { useState } from 'react'
import {ethers} from 'ethers';
import { InstituteandStudentABI,InstituteandStudentAddress } from '../utils/constants/constants_SI.js'

const InstituteRegister = () => {
    const [instituteName, setInstituteName] =  useState('')
    const [instituteCode, setInstituteCode] =  useState('')
    const [password, setPassword] =  useState('')
    const [confirmPassword, setConfirmPassword] =  useState('')

    const submitHandler =  async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert('Password and Confirm Password do not match')
        }
        else{

            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const userContract = new ethers.Contract(InstituteandStudentAddress, InstituteandStudentABI, signer);
                const gasLimit = 1000000;

                const tx = await userContract.addUniversity(instituteName,instituteCode,password,{gasLimit:gasLimit});
                await tx.wait();
                console.log(tx);
                alert('Institute Registered Successfully')

                
            } catch (error) {
                alert('Error in Registering Institute')
            }
            

        }
    }
  return (
   <>
        <div className='bg-img-institute h-screen bg-cover'>
    <Navbar/>

    <div className='flex flex-col justify-center bg-slate-200 max-w-fit rounded-lg m-32 p-8'>
        <div className='m-4'>
        <label className='text-xl font-semibold mr-2'>Institute Name:</label>
        <input type="text" className='border-2' 
        onChange={(e) => setInstituteName(e.target.value)}
        />
        </div>
        <div className='m-4'>
        <label className='text-xl font-semibold mr-2'>Institute Code:</label>
        <input type="text" className='border-2' 
        onChange={(e) => setInstituteCode(e.target.value)}
        />
        </div>
        <div className='m-4'>
        <label className='text-xl font-semibold mr-2'>Password</label>
        <input type="password" className='border-2'
        onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className='m-4'>
        <label className='text-xl font-semibold mr-2'>Confirm Password</label>
        <input type="password" className='border-2' 
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
        </div>

        <div className='m-4'>
            <button className='bg-yellow-400 text-lg p-2 rounded-lg border-2 border-slate-400 hover:bg-yellow-200'
            onClick={submitHandler}
            >Submit</button>
        </div>
    </div>
    </div>
   </>
  )
}

export default InstituteRegister