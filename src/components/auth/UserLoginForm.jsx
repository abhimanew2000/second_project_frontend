// UserLoginForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setUserName,
  setAuthentication,
  setUserEmail,
} from "../../redux/slices/userSlice"; // Update the path
import axios from "../../Utils/axios";
import { useNavigate } from "react-router-dom";
import { GoogleAuth } from "./GoogleAuth";
import { Googlelogin } from "./Glogin";
import { baseUrl } from "../../Utils/urls";
const UserLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseUrl}api/user/login/`,
        formData
      );
      console.log(response.data);
      console.log("Login Response:", response.data);

      const { token, user_name, email } = response.data;
      console.log("Access Token:", token.access);
      localStorage.setItem("usertoken", token.access);
      // localStorage.setItem('token', JSON.stringify({ access }));
      // localStorage.setItem('token', JSON.stringify({ access }));
      localStorage.setItem("user_name", JSON.stringify(user_name));

      // Dispatch the action to update the user's name in the store
      dispatch(setUserName(user_name));
      dispatch(setAuthentication(true));
      dispatch(setUserEmail(email)); // Use the dynamically obtained email
      navigate("/");

      // Optionally, you can redirect the user to another page or perform other actions
    } catch (error) {
      // console.error("Login failed:", error.response.data);
      setErrorMessage("Incorrect email or password");
    }
  };

  return (
    <>
      {/* ---------------------------------- */}
      <div class="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
        <form onSubmit={handleSubmit}>
          <div class="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
            <div class="space-y-4">
              <h1 class="text-center text-2xl font-semibold text-gray-600">
                {" "}
                Sign in to your account
              </h1>

              <div>
                <label
                  for="email"
                  class="block mb-1 text-gray-600 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={handleChange}
                  class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-1 text-gray-600 font-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleChange}
                  class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
              </div>
              <div className="flex items-center justify-between">
                {/* Render error message */}
                {errorMessage && (
                  <p className="text-sm font-medium text-red-500">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
            <div className="pt-5">
              <Googlelogin/>
            </div>

            <button
              class="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
              type="submit"
            >
              signin
            </button>
            <div className="flex w-full justify-end py-3">
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline  "
                onClick={() => navigate("/send-reset-password-email")}
              >
                Forgot password?
              </a>
            </div>
            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <a
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                onClick={() => navigate("/register")}
              >
                Sign up
              </a>
            </p>
          </div>
        </form>

        <div className="flex justify-center"></div>
      </div>
    </>
  );
};

export default UserLoginForm;
