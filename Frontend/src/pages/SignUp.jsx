// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import OAuth from "../components/OAuth";
// // const Try = () => {
// //   const Navigate = useNavigate();
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(false);
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [username, setUsername] = useState("");
// //   const submitHandler = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setLoading(true);
// //       setError(false);
// //       await axios.post("/api/v1/users/Signup", { username, email, password });
// //       Navigate("/Home");
// //       console.log(username, email, password);
// //       setLoading(false);
// //       Navigate("/Home");
// //     } catch (err) {
// //       setLoading(false);
// //       setError(true);
// //     }

// //   };

// //   return loading ? (
// //     <h1 className="text-center font-bold text-2xl">Loading...</h1>
// //   ) : (
// //     <div>
// //       <form onSubmit={submitHandler}>
// //         <section class="bg-gray-50 dark:bg-gray-900">
// //           <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
// //             <Link
// //               href="#"
// //               class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
// //             ></Link>
// //             <p className="text-red-700 mt-2 text-center">
// //               {error ? "Something went wrong!" : ""}
// //             </p>
// //             <div class="w-full bg-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
// //               <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
// //                 <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
// //                   Create and account
// //                 </h1>
// //                 <form class="space-y-4 md:space-y-6" method="post" action="#">
// //                   <div>
// //                     <label
// //                       for="email"
// //                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
// //                     >
// //                       Your email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       onChange={(e) => setEmail(e.target.value)}
// //                       value={email}
// //                       id="email"
// //                       class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// //                       placeholder="name@company.com"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label
// //                       for="password"
// //                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
// //                     >
// //                       Password
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="password"
// //                       id="password"
// //                       onChange={(e) => setPassword(e.target.value)}
// //                       value={password}
// //                       placeholder="••••••••"
// //                       class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label
// //                       for="username"
// //                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
// //                     >
// //                       username{" "}
// //                     </label>
// //                     <input
// //                       type="username"
// //                       name="username"
// //                       id="password"
// //                       onChange={(e) => setUsername(e.target.value)}
// //                       value={username}
// //                       placeholder="Enter username"
// //                       class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// //                     />
// //                   </div>

// //                   <div class="flex items-start">
// //                     <div class="flex items-center h-5">
// //                       <input
// //                         id="terms"
// //                         aria-describedby="terms"
// //                         type="checkbox"
// //                         class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
// //                         required="true"
// //                       />
// //                     </div>
// //                     <div class="ml-3 text-sm">
// //                       <label
// //                         for="terms"
// //                         class="font-light text-gray-500 dark:text-gray-300"
// //                       >
// //                         I accept the{" "}
// //                         <a
// //                           class="font-medium text-primary-600 hover:underline dark:text-primary-500"
// //                           href="#"
// //                         >
// //                           Terms and Conditions
// //                         </a>
// //                       </label>
// //                     </div>
// //                   </div>
// //                   <button class="w-full text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center border font-bold dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
// //                     Create an account
// //                   </button>
// //                   <OAuth />
// //                   <p class="text-sm font-light text-gray-500 dark:text-gray-400">
// //                     Already have an account?{" "}
// //                     <Link
// //                       to="/api/v1/users/SignIn"
// //                       href="#"
// //                       class="font-medium text-primary-600 hover:underline dark:text-primary-500"
// //                     >
// //                       Login here
// //                     </Link>
// //                   </p>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Try;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import OAuth from "../components/OAuth";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { signInSuccess } from "../store/authSlice";

// export default function SignUp() {
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError(false);
//       const res = await axios.post("/api/v1/users/Signup", {
//         username,
//         email,
//         password,
//       });
//       navigate("/Home");
//       console.log(res);
//       dispatch(signInSuccess(res.data));
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);

//       setError(true);
//     }
//   };

//   return (
//     <div className="p-[7%]">
//       <div className="p-3 max-w-lg mx-auto border border-3 rounded ">
//         <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
//         <p className="text-red-700 mt-5  text-center mb-5">
//           {error && "Something went wrong!"}
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
//           <input
//             type="text"
//             placeholder="Username"
//             id="username"
//             name="username"
//             className="bg-black-100 p-3 rounded-lg"
//             onChange={(e) => setUsername(e.target.value)}
//             value={username}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             id="email"
//             name="email"
//             className="bg-black-100 p-3 rounded-lg"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             id="password"
//             name="password"
//             className="bg-black-100 p-3 rounded-lg"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//           <button
//             disabled={loading}
//             className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//           >
//             {loading ? "Loading..." : "Sign Up"}
//           </button>
//           <OAuth />
//         </form>
//         <div className="flex gap-2 mt-5 justify-center items-center">
//           <p>Have an account?</p>
//           <Link to="/api/v1/users/SignIn">
//             <span className="text-blue-500 underline">Sign in</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/authSlice";
import { TEInput, TERipple } from "tw-elements-react";

export default function SignUp() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await axios.post("/api/v1/users/Signup", {
        username,
        email,
        password,
      });
      navigate("/Home");
      console.log(res);
      dispatch(signInSuccess(res.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);

      setError(true);
    }
  };
  return (
    <div>
      <div>
        <section className="h-full bg-neutral-200 dark:bg-neutral-700">
          <div className="container h-full p-10">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
              <div className="w-full">
                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                  <div className="g-0 lg:flex lg:flex-wrap">
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
                            Create and account
                          </h4>
                        </div>
                        <p className="text-red-700 mt-2 text-center">
                          {error
                            ? "Please Check your credentials or User not found" ||
                              error.message
                            : ""}
                        </p>

                        <form>
                          <p className="mb-4">
                            Please Fill the details to create your account
                          </p>
                          {/* <!--Username input--> */}
                          <div className="flex flex-col ">
                            <label>Username :</label>

                            <input
                              type="text"
                              name="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="Enter email"
                              className=" bg-transparent focus:outline-none  placeholder:opacity-[0.5]  max-w-full border-b-2 border-black"
                            />
                            <label className="pt-10">Email :</label>

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
                              className=" bg-transparent  focus:outline-none placeholder:opacity-[0.5]  max-w-full border-b-2 border-black  "
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
                                Sign Up
                              </button>
                            </TERipple>
                            <OAuth />

                            {/* <!--Forgot password link--> */}
                          </div>

                          {/* <!--Register button--> */}
                          <div className="flex items-center justify-between pb-6">
                            <Link to="/api/v1/users/SignIn">
                              Already have an account?
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* <!-- Right column container with background and description--> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
