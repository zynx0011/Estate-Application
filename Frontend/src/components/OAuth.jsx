import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../FireBase.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/authSlice.js";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandlerWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
      const res = await axios.post("/api/v1/users/google", {
        name: response.user.displayName,
        email: response.user.email,
        profilePicture: response.user.photoURL,
      });
      console.log(res);
      console.log(res.data);
      const data = res.data;

      dispatch(signInSuccess(data));
      navigate("/Home");
    } catch (error) {
      console.log("error with google sign in", error);
    }
  };

  return (
    <div className="bg-red-700 rounded-lg">
      <button
        type="button"
        className=" text-white p-2 rounded-lg w-full hover:bg-red-800"
        onClick={submitHandlerWithGoogle}
      >
        Sign in with Google{" "}
      </button>
    </div>
  );
};

export default OAuth;
