import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInStart, signInSuccess, signInFailure } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { TERipple } from "tw-elements-react";
import { BASE_URL } from "../Config/config";
const SignIn = () => {
  const Navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post(
        `${BASE_URL}/api/v1/admin/`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(signInSuccess(res));

      Navigate("/dashboard");
      console.log(res);
    } catch (err) {
      dispatch(signInFailure(err));
      console.log(err.message);
    }
  };
  return (
    <div>
      <div className="block rounded-lg bg-white shadow-lg   dark:bg-neutral-800">
        <div className="g-0 lg:flex lg:flex-wrap">
          {/* <!-- Left column container--> */}
          <div className="px-4 md:px-0 mx-auto w-[40%] text-black">
            <div className="md:mx-6 md:p-12">
              {/* <!--Logo--> */}
              <div className="text-center ">
                <img
                  className="mx-auto w-48"
                  src="https://img.freepik.com/free-vector/logo-real-estate-home-solutions-that-is-home-solution_527952-33.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
                />
                <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                  Welcome To Admin Panel
                </h4>
                <p className="text-red-700 mb-5 text-center">
                  {error ? "Admin Login Failed" || error.message : ""}
                </p>
              </div>

              <form>
                <p className="mb-4">Please login to your account</p>
                {/* <!--Username input--> */}
                <div className="flex flex-col ">
                  <label>Email :</label>

                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className=" bg-transparent focus:outline-none  placeholder:opacity-[0.5]  max-w-full border-b-2 border-black"
                  />

                  {/* <!--Password input--> */}
                  <label className="pt-10">Password :</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className=" bg-transparent focus:outline-none placeholder:opacity-[0.5]  max-w-full border-b-2 border-black  "
                  />
                </div>

                {/* <!--Submit button--> */}
                <div className="mb-12 pb-1 pt-10 text-center ">
                  <TERipple rippleColor="light" className="w-full">
                    <button
                      onClick={submitHandler}
                      className="mb-3  w-full  p-2 rounded-xl   font-bold uppercase text-white "
                      style={{
                        background: "black",
                      }}
                    >
                      Log in
                    </button>
                  </TERipple>

                  {/* <!--Forgot password link--> */}
                </div>

                {/* <!--Register button--> */}
              </form>
            </div>
          </div>

          {/* <!-- Right column container with background and description--> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
