import React from "react";
import { GoogleOAuthProvider,GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode"; // Correct import statement
import axios from "../../Utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../Utils/urls";
import {
  setUserName,
  setAuthentication,
  setUserEmail,
} from "../../redux/slices/userSlice";
export const GoogleAuth = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const c = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID
  console.log(c,"CCCCCCC")

  const registerUserWithGoogle = async (googleData) => {
    try {
      const response = await axios.post(
        `${baseUrl}api/user/register/google/`,
        {
          google_oauth: googleData,
        }
      );
  
      console.log(response.data);
      if (response.data.msg === "Registration successful") {
      dispatch(setUserName(googleData.given_name));
      dispatch(setAuthentication(true));
      dispatch(setUserEmail(googleData.email));
        navigate("/");
      }

      // Handle the response, redirect, etc.
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  
  return (
    <>
    <div className="my-5"
    style={{
        display:'flex',
        flex:1,
        height:'0vh',
        justifyContent:'center',
        alignItems:'center'
    }}>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);

            console.log(decoded)

            console.log(credentialResponse);
            registerUserWithGoogle(decoded);


          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        
      </GoogleOAuthProvider>
    </div>
    </>
  );
};
