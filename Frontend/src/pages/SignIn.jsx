// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { signInStart, signInSuccess, signInFailure } from "../store/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import OAuth from "../components/OAuth";

// const SignIn = () => {
//   const Navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());
//       const res = await axios.post("/api/v1/users/SignIn", { email, password });
//       dispatch(signInSuccess(res));

//       Navigate("/Home");
//     } catch (err) {
//       dispatch(signInFailure(err));
//       console.log(err.message);
//     }
//   };

//   return loading ? (
//     <h1 className="text-center font-bold text-2xl">Loading...</h1>
//   ) : (
//     <form onSubmit={submitHandler}>
//       <div className="mt-[7%] mb-[5%] flex items-center justify-center">
//         <div className="  "></div>
//         <div
//           className="mx-auto flex w-full max-w-sm   p-[2rem]  rounded-lg
//         flex-col gap-6 "
//         >
//           <div className="flex flex-col items-center">
//             <h1 className="text-3xl font-semibold">Sign In</h1>
//             <p className="text-sm">Sign in to access your account</p>
//             <p className="text-red-700 mt-2 text-center">
//               {error
//                 ? "Please Check your credentials or User not found" ||
//                   error.message
//                 : ""}
//             </p>
//           </div>
//           <div className="form-group">
//             <div className="form-field">
//               <label className="text-lg font-semibold">Email address</label>

//               <input
//                 placeholder=" Enter your email"
//                 type="email"
//                 name="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 className=" bg-transparent  placeholder:opacity-[0.5]  max-w-full"
//               />
//               <label className="form-label">
//                 <span className="form-label-alt">
//                   Please enter a valid email.
//                 </span>
//               </label>
//             </div>
//             <div className="form-field">
//               <label className="form-label">Password</label>
//               <div className="form-control">
//                 <input
//                   placeholder="Type here"
//                   type="password"
//                   name="password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="input max-w-full"
//                 />
//               </div>
//             </div>
//             <div className="form-field">
//               <div className="form-control justify-between">
//                 <label className="form-label">
//                   <Link to={"/api/v1/users/forgotPassword"}>
//                     <button className="link link-underline-hover link-primary text-sm">
//                       Forgot your password?
//                     </button>
//                   </Link>
//                 </label>
//               </div>
//             </div>
//             <div className="form-field pt-5">
//               <div className="form-control justify-between">
//                 <button className="btn btn-primary w-full">Sign in</button>
//               </div>
//             </div>
//             <OAuth />

//             <div className="form-field">
//               <div className="form-control justify-center">
//                 <Link to="/api/v1/users/Signup">
//                   <p className="link link-underline-hover link-primary text-sm">
//                     Don't have an account yet? Sign up.
//                   </p>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SignIn;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInStart, signInSuccess, signInFailure } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { TEInput, TERipple } from "tw-elements-react";
const SignIn = () => {
  const Navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("/api/v1/users/SignIn", { email, password });
      dispatch(signInSuccess(res));

      Navigate("/Home");
    } catch (err) {
      dispatch(signInFailure(err));
      console.log(err.message);
    }
  };
  return (
    <div>
      <section className="h-full bg-neutral-200 dark:bg-neutral-700">
        <div className="container h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center">
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
