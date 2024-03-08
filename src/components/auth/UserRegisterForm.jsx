// UserRegisterForm.jsx
import React, { useState } from "react";
import axios from "../../Utils/axios";;
import { useNavigate } from "react-router-dom";
import { GoogleAuth } from "./GoogleAuth";
import { baseUrl } from "../../Utils/urls";
baseUrl
const UserRegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    tc: false,
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.password2) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}api/user/register/`,
        formData
      );
      navigate("/login");
      console.log("data",response.data); // Log the response from the backend
    } catch (error) {
      console.error("Registration failed:", error.response);
    }
  };

  return (
    <>
    
      <div class="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
        <form onSubmit={handleSubmit}>
          <div class="bg-white px-10 py-8 rounded-xl w-screen h-fit shadow-md max-w-sm">
            <div class="space-y-4">
              <h1 class="text-center text-2xl font-semibold text-gray-600">
                Register
              </h1>
              <div>
                <label
                  for="email"
                  class="block mb-1 text-gray-600 font-semibold"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
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
                  Email
                </label>
                <input
                   type="email"
                   name="email"
                   id="email"
                   placeholder="name@gmail.com"
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
                  required
                  onChange={handleChange}
                  class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
              </div>
              <div className="">
                <label
                  class="block mb-1 text-gray-600 font-semibold"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password2"
                  id="confirm-password"
                  placeholder="••••••••"
                  required
                  onChange={handleChange}
                  class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                />
              </div>
            </div>
            <div className="pt-5">

            <GoogleAuth/>
            </div>

            <button type="submit" class="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
              Register
            </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => navigate("/login")}
                  >
                    Login here
                  </a>
                </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserRegisterForm;
