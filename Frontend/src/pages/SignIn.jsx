import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInStart, signInSuccess, signInFailure } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
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
        `${BASE_URL}/api/v1/users/SignIn`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(signInSuccess(res));

      Navigate("/Home");
    } catch (err) {
      dispatch(signInFailure(err));
      console.log(err.message);
    }
  };
  return (
    <div>
      <section className="h-full bg-neutral-200 dark:bg-neutral-700 text-black">
        <div className="container h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12 text-black">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center ">
                        <img
                          className="mx-auto w-48"
                          src="https://img.freepik.com/free-vector/logo-real-estate-home-solutions-that-is-home-solution_527952-33.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Welcome Back
                        </h4>
                      </div>
                      <p className="text-red-700 mt-2 text-center">
                        {error
                          ? "Please Check your credentials or User not found" ||
                            error.message
                          : ""}
                      </p>

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
                          <OAuth />

                          {/* <!--Forgot password link--> */}
                          <Link to={"/api/v1/users/forgotPassword"}>
                            Forgot password?
                          </Link>
                        </div>

                        {/* <!--Register button--> */}
                        <div className="flex items-center justify-between pb-6">
                          <Link to="/api/v1/users/Signup">
                            Don't have an account?
                          </Link>
                          <TERipple rippleColor="light">
                            <Link
                              to={"/api/v1/users/Signup"}
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                              Register
                            </Link>
                          </TERipple>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* <!-- Right column container with background and description--> */}
                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
                    }}
                  >
                    <img
                      className=""
                      src="https://stacks.rocks/site/templates/assets-old/images/user/login.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
