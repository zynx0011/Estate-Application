import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Listing from "../models/listing.model.js";
import nodemailer from "nodemailer";

const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating access token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { email, username, password } = req.body;
  //console.log("email: ", email);
  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //console.log(req.files);

  const user = await User.create({
    email,
    password,
    username,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const { accessToken, refreshToken } =
    await generateAccessTokenandRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "required username or email for login");
  }

  const Notuser = await User.findOne({
    email,
  });

  if (!Notuser) {
    throw new ApiError(400, "User not found");
  }

  const isPasswordValid = await Notuser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }

  const { refreshToken, accessToken } =
    await generateAccessTokenandRefreshToken(Notuser._id);

  const user = await User.findById(Notuser._id).select(
    "-password -refreshToken" //select mehtod will not show refresh token andd password
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user,
        },
        "user loggedIn successfully"
      )
    );
});

const logoutuser = asyncHandler(async (req, res) => {
  await User.findById(
    req.user._id
    //   //   {
    //   //     $unset: { refreshToken: 1 },
    //   //   },
    //   //   { new: true }
  );
  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", option)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, `user was logged out successfully`));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthenticated request");
  }
  try {
    const decodedToken = Jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!decodedToken) {
      throw new ApiError(401, "token not found");
    }

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== generateAccessTokenandRefreshToken) {
      throw new ApiError(401, "refresh token is expired");
    }

    const option = {
      httpOnly: true,
      secure: true,
    };

    const { newrefreshToken, accessToken } =
      await generateAccessTokenandRefreshToken(user._id);

    return res
      .status(200)
      .cookie("refreshToken", newrefreshToken, option)
      .cookie("accessToken", accessToken, option)
      .json(
        new ApiResponse(
          200,
          { refreshToken: newrefreshToken, accessToken },
          "access token successfully refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(
      401,
      error.message || "error while generating refresh token"
    );
  }
});

const changeCurrentUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, "password was changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(201)
    .json(
      new ApiResponse(201, req.user?.username, "user was featched successfully")
    );
});

const updateUserName = asyncHandler(async (req, res) => {
  const { oldusername, newusername } = req.body;

  if (req.user?.username !== oldusername) {
    throw new ApiError(400, "oldusername was wrong");
  }

  if (req.user?.username == newusername) {
    throw new ApiError(400, "username was already existing");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username: newusername,
      },
    },

    { new: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "Username not found");
  }
  console.log(user.username && oldusername);

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "username is changed successfully"));
});

const updateAccoutDetails = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username: req.body.username || req.user?.username,
        email: req.body?.email || req.user?.email,
        profilePicture:
          req.body?.formData?.profilePicture || req.user?.profilePicture,
      },
    },
    { new: true }
  );

  console.log("this is req body of   ", req.body);
  if (!req.body.username || !req.body.email === "") {
    throw new ApiError(400, "All fields are required");
  }

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  console.log(user);

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User updated successfully"));
});

// const google = asyncHandler(async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   console.log(req.body.email);
//   console.log(user);

//   if (user) {
//     const loggedInUser = await User.findById(user._id);

//     const { accessToken, refreshToken } =
//       await generateAccessTokenandRefreshToken(user._id);

//     return res.status(200).json(
//       new ApiResponse(
//         200,
//         {
//           user: loggedInUser,
//           accessToken,
//           refreshToken,
//         },
//         "user loggedIn successfully"
//       )
//     );
//   }

//   if (!user) {
//     const generatedPassword =
//       Math.random().toString(36).slice(-8) +
//       Math.random().toString(36).slice(-8);
//     const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

//     console.log(req.body.email);

//     const createuser = await User.create({
//       email: req.body.email,
//       username: req.body.name,
//       password: hashedPassword,
//       profilePicture: req.body.photo,
//     });

//     if (!createuser) {
//       throw new ApiError(400, "user not created");
//     }
//   }

//   const { accessToken, refreshToken } =
//     await generateAccessTokenandRefreshToken(user._id);

//   return res
//     .status(200)
//     .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
//     .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
//     .json(new ApiResponse(200, { user }, "user created successfully"));
// });

const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const exsistingUser = await User.findById(user?._id);

    if (user && exsistingUser) {
      const { accessToken, refreshToken } =
        await generateAccessTokenandRefreshToken(user._id);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          expires: expiryDate,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const { accessToken, refreshToken } =
        await generateAccessTokenandRefreshToken(newUser._id);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          expires: expiryDate,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "user deleted successfully"));
});

const listAccount = async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      return res.status(200).json(listings);
    } catch (error) {
      throw new ApiError(error);
    }
  } else {
    return new ApiError((401, "You can only view your own listings!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return new ApiError(404, "User not found!");

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    throw new ApiError(error);
  }
};

const forgotPassword = async (req, res) => {
  if (!req.body.email || req.body.email === null) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email: req.body.email });

  // console.log("email of body", req.body.email);
  // console.log("email of user", user);

  if (!user || user === null) {
    return res.status(404).json({ message: "User not found" });
  }

  // console.log("This is the user", user);

  const secret = process.env.REFRESH_TOKEN_SECRET + user.password;

  const token = Jwt.sign({ _id: user._id }, secret, {
    expiresIn: "5m",
  });
  console.log("This is the token  ", token);
  const link = `http://localhost:5173/reset-password/${user._id}/${token}`;

  // let transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "Estate@gmail.com",
  //     pass: "yourpassword",
  //   },
  // });

  // let mailOptions = {
  //   from: "youremail@gmail.com",
  //   to: "abc@gmail.com",
  //   subject: "Reset Password",
  //   text: link,
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });

  console.log("This is the link", link);
  if (!token) {
    throw new ApiError(404, "No token found");
  }

  return res.status(200).json({ link });
};

const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  console.log(id, "Reset Password");
  const existeduser = await User.findOne({ _id: id });

  if (!existeduser) {
    throw new ApiError(404, "User not found");
  }

  const secret = process.env.REFRESH_TOKEN_SECRET + existeduser.password;

  const verify = Jwt.verify(token, secret);

  if (!verify) {
    throw new ApiError(404, "Invalid token in rest password");
  }
});

const changeforgotPassword = asyncHandler(async (req, res) => {
  const { userId, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  // console.log("userId", req.params.userId);
  // console.log("Token", token);

  // console.log("this is change password userId", userId);
  const existeduser = await User.findOne({ _id: userId });

  if (!existeduser) {
    throw new ApiError(404, "User not found");
  }
  const secret = process.env.REFRESH_TOKEN_SECRET + existeduser.password;

  try {
    const verify = Jwt.verify(token, secret);
    if (!verify) {
      throw new ApiError(404, "Invalid token");
    }
  } catch (error) {
    console.log("error while verify token", error);
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(404, "Password does not match");
  }
  const hashedPassword = bcryptjs.hashSync(newPassword, 10);

  const user = await User.findByIdAndUpdate(userId, {
    $set: {
      password: hashedPassword,
    },
  });

  if (!user) {
    throw new ApiError(404, "error while updating password");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Password updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutuser,
  refreshAccessToken,
  changeCurrentUserPassword,
  getCurrentUser,
  updateAccoutDetails,
  updateUserName,
  google,
  deleteAccount,
  listAccount,
  forgotPassword,
  resetPassword,
  changeforgotPassword,
};
