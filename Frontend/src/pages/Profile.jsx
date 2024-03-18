import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../FireBase.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  signOut,
} from "../store/authSlice.js";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { BASE_URL } from "../Config/config.js";
import Alert from "@mui/material/Alert";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser?.data?.data?.user;
  const currentData = currentUser?.data;
  console.log(currentUser);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState(undefined);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [Error, setError] = useState(false);
  const [userListingError, setUserListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);

  useEffect(() => {
    if (image) {
      HandleFileUpload(image);
    }
  }, [image]);

  const HandleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ profilePicture: downloadURL })
        );
      }
    );
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };

  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(
        `${BASE_URL}/api/v1/users/update-account/${
          currentUser?._id || user?._id || currentData?._id
        }`,

        {
          username,
          email,
          formData,
        }
      );
      // console.log("User updated successfully", res.data);
      dispatch(updateUserSuccess(res));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
      setError(true);
      console.log("Error while updating user", error);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(
        `${BASE_URL}/api/v1/users/delete-account/${
          currentUser?._id || user?._id || currentData._id
        }`
      );
      dispatch(deleteUserSuccess(res));
      console.log("Account deleted successfully", res);
    } catch (error) {
      dispatch(deleteUserFailure(error));
      console.log(" Error while deleting account", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.get(`${BASE_URL}/api/v1/users/logout`);
      dispatch(signOut());
    } catch (error) {
      console.log("Error while signing out", error);
    }
  };

  useEffect(() => {
    const res = async () => {
      try {
        setUserListingError(false);

        const res = await axios.get(
          `${BASE_URL}/api/v1/users/listing/${
            currentUser?._id || user?._id || currentData?._id
          }`
        );

        setUserListing(res.data);
      } catch (error) {
        setUserListingError(true);
      }
    };

    res();
  }, [currentUser, user, currentData]);

  const handleListingDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/v1/listing/delete/${id}`);

      setUserListing((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Error while deleting listing", error);
    }
  };

  return (
    <div>
      <h1 className="sm:text-5xl text-3xl font-semibold text-center my-7">
        Profile
      </h1>
      <hr className="w-[80%] m-auto" />

      {updateSuccess ? (
        <Alert
          variant="filled"
          severity="success"
          className="absolute right-3 top-[16%] "
          sx={{ width: "20%" }}
        >
          Successfully Updated Information
        </Alert>
      ) : Error ? (
        <Alert
          variant="filled"
          severity="error"
          className="absolute right-3 top-[16%] "
          sx={{ width: "20%" }}
        >
          This is a filled error Alert.
        </Alert>
      ) : null}

      <p className="sm:text-4xl text-2xl   text-center  mt-10 font-bold ">
        Welcome back,{" "}
        <span className="text-amber-600">
          {user?.username ||
            currentUser?.name ||
            currentUser?.username ||
            currentData?.username}
        </span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center  gap-4"
      >
        <div className="flex flex-col sm:flex-row  items-center sm:gap-24 p-7 flex-wrap  m-auto  ">
          <div>
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={
                formData?.profilePicture ||
                user?.profilePicture ||
                currentUser?.profilePhoto ||
                currentUser?.profilePicture ||
                currentData?.profilePicture
              }
              alt="profile"
              className="h-96 w-96 sm:h-96 sm:w-96 self-center  cursor-pointer rounded-full object-cover mt-7  sm:ml-14  overflow-hidden"
              onClick={() => fileRef.current.click()}
            />
            <p className="text-slate-500 mt-6  sm:ml-28 ml-16">
              Click The Profile Picture To Change
            </p>
          </div>

          <div className=" flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-center my-2 mb-3">
              Information Panel
            </h1>

            <label className="text-slate-500 ">Change Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              defaultValue={
                user?.username ||
                currentUser?.name ||
                currentUser?.username ||
                currentData?.username
              }
              // value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-400 text-black sm:w-[130%]  font-semibold rounded-lg p-3 mb-4"
            />
            <label className="text-slate-500 ">Change Email</label>
            <input
              type="text"
              placeholder="email"
              // value={email}
              name="email"
              defaultValue={
                user?.email || currentUser?.email || currentData?.email
              }
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-400 text-black  sm:w-[130%] font-semibold rounded-lg p-3 "
            />
            {/* <input
              type="text"
              placeholder="password"
              name="password"
              className="bg-gray-400 text-black placeholder:text-black font-semibold rounded-lg p-3 my-4"
            /> */}
            <p className="text-sm self-center">
              {imageError ? (
                <span className="text-red-700">
                  Error uploading image (file size must be less than 2 MB)
                </span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
              ) : imagePercent === 100 ? (
                <span className="text-green-700">
                  Image uploaded successfully
                </span>
              ) : (
                ""
              )}
            </p>

            <p className="text-green-700  text-center">
              {updateSuccess ? (
                "Details are updated successfully!"
              ) : (
                <p className="text-red-700  text-center">
                  {(Error && "Something went wrong!") || Error.message}
                </p>
              )}
            </p>
            <button className="bg-green-700  sm:w-[70%]  text-white p-3 rounded-full  hover:opacity-95 border font-bold my-2">
              Update Changes
            </button>
          </div>
          <div className="mt-[17%] ml-[45%] sm:mt-[49%] sm:ml-0">
            {" "}
            <Link to="/change-password">
              <span className="text-blue-700 cursor-pointer p-3 font-semibold  underline ">
                Change Password ?
              </span>
            </Link>
          </div>
        </div>
        <div className="">
          {" "}
          <Link
            to={`/FavoritedListing/${
              user?._id || currentUser?._id || currentData?._id
            }`}
            className=""
          >
            <span className="bg-amber-700 text-white  cursor-pointer p-3 rounded-3xl  font-bold ">
              Show Favorited Properties
            </span>
          </Link>
        </div>
        <hr className=" mt-7 w-full" />
        <div className="flex flex-col gap-20 justify-center items-center min-h-[50vh]">
          <h1 className="text-5xl font-bold text-center my-2">
            Want To <span className="text-amber-600">Publish Property</span>
          </h1>
          <Link
            to="/create-listing"
            className="bg-[#213E5F] text-center text-white p-3 rounded-full w-1/2 text-2xl  hover:opacity-95  font-bold my-2"
          >
            Create Listing
          </Link>
        </div>
        <hr className=" w-full" />
        <div className="flex flex-col gap-20 justify-center items-center min-h-[50vh]">
          <h1 className="text-5xl font-bold text-center my-2">
            See Your{" "}
            <span className="text-amber-600">Published Properties</span>
          </h1>
          {/* <button
            // to="/create-listing"
            // onClick={handleShowListing}
            className="bg-[#213E5F] text-center text-white p-3 rounded-full w-1/2 text-2xl  hover:opacity-95  font-bold my-2"
          > */}
          {/* My Properties
          </button> */}
          {userListing.length === 0 && (
            <p className="text-red-600 font-semibold text-xl mt-0">
              No Properties Found
            </p>
          )}
        </div>

        {/* <button
          onClick={handleShowListing}
          type="button"
          className="text-green-700 text-center  hover:underline uppercase hover:opacity-95font-bold"
        >
          Show Listing
        </button> */}
        <p>{userListingError && "Something went wrong!"}</p>
        {userListing && userListing.length > 0 && (
          <>
            <h1 className="text-center  text-2xl font-semibold">
              Your Properties
            </h1>
            <div className="flex items-center justify-evenly  flex-wrap gap-4">
              {userListing.map((listing) => (
                <div
                  className="flex flex-wrap w-[60%] sm:w-[20%] h-[50vh]  border rounded-xl mb-10 relative"
                  key={listing._id}
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className=" h-[60%] w-[100%] object-cover "
                    />
                    <h1 className=" text-center font-semibold mt-4 text-xs sm:text-lg">
                      {listing.name}
                    </h1>
                    <div className="flex sm:space-x-20 item-center left-3  space-x-10 sm:left-10 absolute bottom-5">
                      <Link to={`/update-listing/${listing._id}`}>
                        <button className="bg-green-700 text-white p-2 w-[10vh]  rounded-full font-semibold ">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleListingDelete(listing._id)}
                        className="bg-red-700 text-white p-2 rounded-full  w-[10vh] font-semibold "
                      >
                        Delete
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
        <hr className="w-[80%]" />
        <div className="flex  items-center min-h-[30vh] justify-evenly w-full my-4 ">
          <button
            onClick={handleDelete}
            className="bg-red-700 text-white p-3 font-semibold rounded-lg hover:bg-red-600"
          >
            Delete Accout
          </button>

          <button
            onClick={handleSignOut}
            className="text-red-600 cursor-pointer p-3 font-semibold underline hover:text-red-800 flex  items-center gap-4"
          >
            Sign Out
            <span className="text-xl">
              <FaSignOutAlt />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
