import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserNavbar } from "../../UserNavbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../Utils/urls";
const userTokenData = localStorage.getItem("usertoken");
console.log(userTokenData, "USERTOKEN");
const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const userToken = useSelector((state) => state.user.usertoken);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/user/profile/`,
          {
            headers: {
              Authorization: `Bearer ${userTokenData}`,
              "Content-Type": "application/json",
            },
          }
        ); // Replace with your actual API endpoint
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
    <UserNavbar/>
    <div class="p-16">
      <div class="p-8 bg-white shadow mt-24">
        {" "}
        <div class="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            {" "}
            <div>
              {" "}
              <p class="font-bold text-gray-700 text-xl">22</p>{" "}
              <p class="text-gray-400">Friends</p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p class="font-bold text-gray-700 text-xl">10</p>{" "}
              <p class="text-gray-400">Photos</p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p class="font-bold text-gray-700 text-xl">89</p>{" "}
              <p class="text-gray-400">Comments</p>{" "}
            </div>{" "}
          </div>{" "}
          <div class="relative">
            {" "}
            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>{" "}
            </div>{" "}
          </div>{" "}
          <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              {" "}
              Connect
            </button>{" "}
            <button class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              {" "}
              Message
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div class="mt-20 text-center border-b pb-12">
          {" "}
          <h1 class="text-4xl font-medium text-gray-700">
          {userData && userData.name}
 <span class="font-light text-gray-500">27</span>
          </h1>{" "}
          <p class="font-light text-gray-600 mt-3">{userData && userData.email}</p>{" "}
          <p class="mt-8 text-gray-500">
          </p>{" "}
         <Link to = '/changepassword'><p class="mt-2 text-gray-500">Change Password</p></Link> {" "}
        </div>{" "}
        <div class=" flex flex-col justify-center">
            <div className="flex justify-center w-full">
                <div className="grid grid-cols-4 items-center mt-5 w-9/12 border ">
                    <div className="border py-5 bg-blue-100">
                        <h1 className="flex justify-center">1</h1>
                    </div>
                    <div className="border py-5 bg-gray-100"><Link to='/user/bookings' className="flex justify-center">Bookings</Link></div>

                    <div className="border py-5 bg-gray-100"><Link to='/wishlist' className="flex justify-center">Wishlist</Link></div>
                    <div className="border py-5 bg-gray-100"><h1 className="flex justify-center">2</h1></div>
                 </div>

            </div>
          <p class="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>{" "}
          <button class="text-indigo-500 py-2 px-4  font-medium mt-4">
            {" "}
            Show more
          </button>{" "}
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;
