import React from "react";
import { useState } from "react";
import axios from "axios";
export const SendPasswordResetEmail = () => {
  const [email, setEmail] = useState("");
  const userToken = localStorage.getItem("usertoken");

  const handleSendResetEmail = async () => {
    try {
      // Make a POST request to your backend API for sending a reset email
      const response = await axios.post(
        "/api/user/send-reset-password-email/",
        { email },
        // { headers: { Authorization: `Bearer ${userToken}` } }
      );

      console.log(response.data.msg);
      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      console.error("Error sending reset email:", error);
      // Handle errors or display error messages to the user
    }
  };
  return (
    <>
      {/* <div>
        <h2>Send Password Reset Email</h2>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSendResetEmail}>Send Reset Email</button>
      </div> */}

      <div class="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
        <div class="bg-white px-10 py-8 rounded-xl w-5/12 shadow-md ">
          <div class="space-y-4 ">
            <h1 class="text-center text-2xl font-semibold text-gray-600 h-fit">
              Register
            </h1>
            <div
              method="POST"
              action="#"
              class=" sm:rounded-xl sm:border sm:border-gray-100 sm:bg-white sm:p-2 sm:shadow h-fit"
            >
              <div class="flex flex-col gap-2 h-10 sm:flex-row sm:items-center sm:justify-between ">
                <div class="relative text-gray-500 sm:w-11/12">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        class=""
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    class="w-full cursor-text rounded-xl border-2 py-4 pr-4 pl-10 text-base outline-none transition-all duration-200 ease-in-out sm:border-0 focus:border-transparent focus:ring"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSendResetEmail}
                  class="h-12 group flex items-center justify-center rounded-xl bg-blue-700 px-6   text-white transition"
                >
                  <span class="group flex w-full items-center justify-center rounded text-center font-medium">
                    Submit
                  </span>
                  <svg
                    class="shrink-0 group-hover:ml-8 ml-4 h-4 w-4 transition-all"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
