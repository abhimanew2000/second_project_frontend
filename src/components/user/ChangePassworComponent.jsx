// ChangePasswordComponent.jsx
import React, { useState } from 'react';
import axios from '../../Utils/axios';
import { toast } from "react-toastify";
import { UserNavbar } from '../../UserNavbar';
import { useNavigate } from 'react-router-dom';
const ChangePasswordComponent = () => {
    const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const userToken = localStorage.getItem('usertoken');
  console.log(userToken,"this is usertoken")

  const handleChangePassword = async (e) => {
    e.preventDefault()
    try {

      console.log("this is working")
      // Make a POST request to your backend API for changing the password
      const response = await axios.post(
        '/api/user/changepassword/',
        { password, password2 },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      console.log(response.data.msg);
      toast.success("Password Changed Successfully")
      navigate('/user/profile')
      

      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error("Password and Confirm password is Not Same")

      // Handle errors or display error messages to the user
    }
  };

  return (
   
    <>
    <UserNavbar/>
    <div className="flex w-full flex-wrap">
  <div className="flex w-full flex-col md:w-1/2 lg:w-1/3">

    <div className="my-auto flex flex-col justify-center px-6 pt-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12">
      <p className="text-center text-3xl font-bold">Change Password </p>
      <p className="mt-2 text-center">Enter password and Confim password.</p>
      <form className="flex flex-col pt-3 md:pt-8">
        
        <div className="mb-12 flex flex-col pt-4">
          <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
            <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
              </svg>
            </span>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none" placeholder="Password" />
          </div>
        <div className="mb-12 flex flex-col pt-4">
          <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
            <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
              </svg>
            </span>
            <input type="password" value={password2}  onChange={(e) => setPassword2(e.target.value)} className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none" placeholder="Password" />
          </div>
        </div>
        </div>



        <button onClick={(e)=>handleChangePassword(e)} type="submit" className="w-full rounded-lg bg-blue-700 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition ease-in hover:bg-blue-600 focus:outline-none focus:ring-2">
          <span className="w-full"> Change Password  </span>
        </button>
      </form>
     
    </div>
  </div>
 
</div>

    
    </>
  );
};

export default ChangePasswordComponent;
