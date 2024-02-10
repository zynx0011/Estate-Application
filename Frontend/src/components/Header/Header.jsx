import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser?.data?.data?.user;
  const currentData = currentUser?.data;
  return (
    <div className="flex items-center justify-around border-b-2 h-[10vh] min-h-[10vh] sm:h-auto border-white bg-[#101010] ">
      <div>
        <Link to={"/"}>
          <img className="sm:w-[9vw] w-[50%] " src="" alt="logo" />
        </Link>
      </div>
      <div className="flex items-center   justify-between w-[80%] sm:w-auto flex-wrap">
        <ul className="flex  items-center  sm:flex-col mt-4 font-medium lg:flex-row lg:space-x-8 flex-wrap  lg:mt-0">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-gray-500" : "text-white"
                }  hover:border-b-2 lg:hover:bg-transparent lg:border-0  lg:p-0 font-semibold`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-gray-500" : "text-white"
                }  hover:border-b-2 lg:hover:bg-transparent lg:border-0  lg:p-0 font-semibold`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-gray-500" : "text-white"
                }  hover:border-b-2 lg:hover:bg-transparent lg:border-0  lg:p-0 font-semibold`
              }
            >
              Contact
            </NavLink>
          </li>
          <li></li>
        </ul>
        <Link to="/profile">
          <button className="font-semibold hover:border-b-2">
            {currentUser ? (
              <img
                src={
                  currentUser?.profilePhoto ||
                  user?.profilePicture ||
                  currentUser?.profilePicture ||
                  currentData?.profilePicture
                }
                alt="logoo"
                className="w-10 h-10 rounded-full object-cover "
              />
            ) : (
              "Sign Up"
            )}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
