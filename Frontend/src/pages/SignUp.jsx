import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/authSlice";
import { TERipple } from "tw-elements-react";
import { BASE_URL } from "../Config/config";

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
      const res = await axios.post(
        `${BASE_URL}/api/v1/users/Signup`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/");
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
        <section className="h-full bg-neutral-200 dark:bg-neutral-700 text-black">
          <div className="container h-full p-10 text-black">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
              <div className="w-full">
                <div className="block  rounded-lg bg-white shadow-lg dark:bg-neutral-800 text-black">
                  <div className="g-0 lg:flex lg:flex-wrap">
                    <div
                      className="hidden  sm:flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
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
                    <div className="px-4 md:px-0  lg:w-6/12">
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
