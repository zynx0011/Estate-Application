import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInStart, signInSuccess, signInFailure } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

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

  return loading ? (
    <h1 className="text-center font-bold text-2xl">Loading...</h1>
  ) : (
    <form onSubmit={submitHandler}>
      <div className="mt-[7%] mb-[5%] ">
        <div
          className="mx-auto flex w-full max-w-sm border  border-white p-[2rem]  rounded
        flex-col gap-6 "
        >
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold">Sign In</h1>
            <p className="text-sm">Sign in to access your account</p>
            <p className="text-red-700 mt-2 text-center">
              {error
                ? "Please Check your credentials or User not found" ||
                  error.message
                : ""}
            </p>
          </div>
          <div className="form-group">
            <div className="form-field">
              <label className="form-label">Email address</label>

              <input
                placeholder="Type here"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="input max-w-full"
              />
              <label className="form-label">
                <span className="form-label-alt">
                  Please enter a valid email.
                </span>
              </label>
            </div>
            <div className="form-field">
              <label className="form-label">Password</label>
              <div className="form-control">
                <input
                  placeholder="Type here"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input max-w-full"
                />
              </div>
            </div>
            <div className="form-field">
              <div className="form-control justify-between">
                <div className="flex gap-2">
                  <input type="checkbox" className="checkbox" />
                  <Link href="#">Remember me</Link>
                </div>
                <label className="form-label">
                  <Link className="link link-underline-hover link-primary text-sm">
                    Forgot your password?
                  </Link>
                </label>
              </div>
            </div>
            <div className="form-field pt-5">
              <div className="form-control justify-between">
                <button className="btn btn-primary w-full">Sign in</button>
              </div>
            </div>
            <OAuth />

            <div className="form-field">
              <div className="form-control justify-center">
                <Link to="/api/v1/users/Signup">
                  <p className="link link-underline-hover link-primary text-sm">
                    Don't have an account yet? Sign up.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
