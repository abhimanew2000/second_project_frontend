import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../../Utils/axios";
import { baseUrl } from "../../Utils/urls";
export const ResetPasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const userToken = localStorage.getItem("usertoken");
  console.log(userToken);
  const { uid, token } = useParams();
  console.log(uid, "uid", token, "token");

  const handleResetPassword = async () => {
    try {
      if (!uid || !token) {
        console.error("UID or token is undefined");
        return;
      }
      const response = await axios.post(
        `${baseUrl}api/user/reset-password/${uid}/${token}/`,
        { password, password2 },
        {}
        // { headers: { Authorization: `Bearer ${userToken}` } }
      );

      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle errors or display error messages to the user
    }
  };
  return (
    <>
      {/* <div>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button onClick={handleResetPassword}>Reset Password</button>
      </div> */}
      {/* <!-- component --> */}
      <div class="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
        <form>
          <div class="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
            <div class="space-y-4">
              <h1 class="text-center text-2xl font-semibold text-gray-600">
                Reset Password
              </h1>

              <div>
                <label
                  for="email"
                  class="block mb-1 text-gray-600 font-semibold"
                >
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
              </div>
              <div>
                <label class="block mb-1 text-gray-600 font-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
              </div>
            </div>
            <button
              class="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
              onClick={handleResetPassword}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
