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

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser?.data?.data?.user;
  const currentData = currentUser?.data;
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
        `/api/v1/users/update-account/${
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
        `/api/v1/users/delete-account/${
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
      await axios.get("/api/v1/users/logout");
      dispatch(signOut());
    } catch (error) {
      console.log("Error while signing out", error);
    }
  };

  const handleShowListing = async () => {
    try {
      setUserListingError(false);

      const res = await axios.get(
        `/api/v1/users/listing/${
          currentUser?._id || user?._id || currentData?._id
        }`
      );

      setUserListing(res.data);
    } catch (error) {
      setUserListingError(true);
    }
  };

  const handleListingDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/listing/delete/${id}`);

      setUserListing((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Error while deleting listing", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <p className="text-2xl text-center">
        Welcome back,{" "}
        {user?.username ||
          currentUser?.name ||
          currentUser?.username ||
          currentData?.username}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center  gap-4"
      >
        <div className="flex flex-col my-1 w-1/2">
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
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            onClick={() => fileRef.current.click()}
          />
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

          <p className="text-green-700 mt-5 text-center">
            {updateSuccess ? (
              "Details are updated successfully!"
            ) : (
              <p className="text-red-700 mt-5 text-center">
                {(Error && "Something went wrong!") || Error.message}
              </p>
            )}
          </p>
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
            className="bg-gray-400 text-black  font-semibold rounded-lg p-3 my-4"
          />
          <input
            type="text"
            placeholder="email"
            // value={email}
            name="email"
            defaultValue={
              user?.email || currentUser?.email || currentData?.email
            }
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-400 text-black  font-semibold rounded-lg p-3 my-4"
          />
          {/* <input
            type="text"
            placeholder="password"
            name="password"
            className="bg-gray-400 text-black placeholder:text-black font-semibold rounded-lg p-3 my-4"
          /> */}
          <button className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 border font-bold my-2">
            Update
          </button>
          <Link
            to="/create-listing"
            className="bg-green-700 text-center text-white p-3 rounded-lg uppercase hover:opacity-95 border font-bold my-2"
          >
            Create Listing
          </Link>
        </div>
        <div className="flex justify-between items-center  sm:gap-0 sm:w-1/2 my-4 ">
          <button
            onClick={handleDelete}
            className="text-red-700 cursor-pointer p-3 underline  hover:text-red-600"
          >
            Delete Accout
          </button>
          <Link to="/change-password">
            <span className="text-white-700 cursor-pointer p-3 font-semibold  underline ">
              Change Password ?
            </span>
          </Link>
          <button
            onClick={handleSignOut}
            className="text-red-700 cursor-pointer p-3 font-semibold underline hover:text-red-600"
          >
            Sign Out
          </button>
        </div>
        <button
          onClick={handleShowListing}
          type="button"
          className="text-green-700 text-center  hover:underline uppercase hover:opacity-95font-bold"
        >
          Show Listing
        </button>
        <p>{userListingError && "Something went wrong!"}</p>
        {userListing && userListing.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-center mt-7 text-2xl font-semibold">
              Your Listings
            </h1>
            {userListing.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-3 w-[17rem] flex  justify-between items-center gap-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
