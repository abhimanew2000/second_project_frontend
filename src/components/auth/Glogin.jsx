import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "../../Utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode"; 
import { baseUrl } from "../../Utils/urls";

import {
  setUserName,
  setAuthentication,
  setUserEmail,
} from "../../redux/slices/userSlice";

export const Googlelogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const loginUserWithGoogle = async (googleData) => {
    try {
      console.log(googleData, "DATA");
      const response = await axios.post(
        `${baseUrl}api/user/login/google/`,
        {
          google_oauth: googleData,
        }
      );

      console.log(response.data);
      if (response.data.msg === "Login Success") {
        const { token, user_name, email } = response.data;
        localStorage.setItem("usertoken", token.access);
        localStorage.setItem("user_name", JSON.stringify(user_name));
        dispatch(setUserName(googleData.given_name));
        dispatch(setAuthentication(true));
        dispatch(setUserEmail(email));
        navigate("/");
      }

    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      className="my-5"
      style={{
        display: "flex",
        flex: 1,
        height: "0vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleOAuthProvider clientId="426249040470-q0nniqiqvbstkchn5lbupvp4alg3ual3.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);

            console.log(decoded);

            console.log(credentialResponse);
            loginUserWithGoogle(decoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        
      </GoogleOAuthProvider>
    </div>
  );
};
