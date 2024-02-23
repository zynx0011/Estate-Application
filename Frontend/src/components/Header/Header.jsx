import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser?.data?.data?.user;
  const currentData = currentUser?.data;
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerms", searchTerm);
    const serachQuery = urlParams.toString();
    navigate(`/search?/${serachQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerms");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex items-center bg-stone-800  justify-around border-b-2 h-[10vh] min-h-[12vh] sm:h-auto border-white ">
      <div>
        <Link to={"/"}>
          <img
            className="sm:w-[5vw] w-[33%] p-3 ml-6 sm:ml-0 sm:p-0 rounded-full "
            src="https://img.freepik.com/free-vector/logo-real-estate-home-solutions-that-is-home-solution_527952-33.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
            alt="logo"
          />
        </Link>
      </div>
      {/* <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-2 rounded-lg flex items-center"
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-24 sm:w-64 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaSearch className="text-slate-600" />
        </button>
      </form> */}
      <div className="flex items-center   justify-evenly w-[80%] sm:w-auto flex-wrap">
        <ul className="lg:flex hidden  items-center sm:flex-col  font-medium lg:flex-row lg:space-x-8 flex-wrap  ">
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
          <button className="font-semibold hover:border-b-2 ">
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
