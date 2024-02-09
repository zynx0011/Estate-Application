// import { useSelector } from 'react-redux';
// import { useRef, useState, useEffect } from 'react';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../FireBase.js';
// import { useDispatch } from 'react-redux';
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   deleteUserFailure,
//   signOut,
// } from '../redux/user/userSlice';

// export default function Profile() {
//   const dispatch = useDispatch();
//   const fileRef = useRef(null);
//   const [image, setImage] = useState(undefined);
//   const [imagePercent, setImagePercent] = useState(0);
//   const [imageError, setImageError] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);

//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   useEffect(() => {
//     if (image) {
//       handleFileUpload(image);
//     }
//   }, [image]);
//   const handleFileUpload = async (image) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + image.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, image);
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setImagePercent(Math.round(progress));
//       },
//       (error) => {
//         setImageError(true);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//           setFormData({ ...formData, profilePicture: downloadURL })
//         );
//       }
//     );
//   };
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data));
//         return;
//       }
//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error));
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error));
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await fetch('/api/auth/signout');
//       dispatch(signOut())
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           type='file'
//           ref={fileRef}
//           hidden
//           accept='image/*'
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         {/*
//       firebase storage rules:
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*') */}
//         <img
//           src={formData.profilePicture || currentUser.profilePicture}
//           alt='profile'
//           className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
//           onClick={() => fileRef.current.click()}
//         />
//         <p className='text-sm self-center'>
//           {imageError ? (
//             <span className='text-red-700'>
//               Error uploading image (file size must be less than 2 MB)
//             </span>
//           ) : imagePercent > 0 && imagePercent < 100 ? (
//             <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
//           ) : imagePercent === 100 ? (
//             <span className='text-green-700'>Image uploaded successfully</span>
//           ) : (
//             ''
//           )}
//         </p>
//         <input
//           defaultValue={currentUser.username}
//           type='text'
//           id='username'
//           placeholder='Username'
//           className='bg-slate-100 rounded-lg p-3'
//           onChange={handleChange}
//         />
//         <input
//           defaultValue={currentUser.email}
//           type='email'
//           id='email'
//           placeholder='Email'
//           className='bg-slate-100 rounded-lg p-3'
//           onChange={handleChange}
//         />
//         <input
//           type='password'
//           id='password'
//           placeholder='Password'
//           className='bg-slate-100 rounded-lg p-3'
//           onChange={handleChange}
//         />
//         <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
//           {loading ? 'Loading...' : 'Update'}
//         </button>
//       </form>
//       <div className='flex justify-between mt-5'>
//         <span
//           onClick={handleDeleteAccount}
//           className='text-red-700 cursor-pointer'
//         >
//           Delete Account
//         </span>
//         <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
//           Sign out
//         </span>
//       </div>
//       <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
//       <p className='text-green-700 mt-5'>
//         {updateSuccess && 'User is updated successfully!'}
//       </p>
//     </div>
//   );
// }

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
  console.log(user);
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
      </form>
    </div>
  );
};

export default Profile;
