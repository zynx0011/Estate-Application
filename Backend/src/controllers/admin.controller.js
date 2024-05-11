import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessTokenandRefreshToken } from "../controllers/user.controller.js";
import Listing from "../models/listing.model.js";

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "required username or email for login");
  }

  const admin = await User.findOne({
    email,
  });

  if (admin.isAdmin !== true) {
    throw new ApiError(400, "Admin not found");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }

  const { refreshToken, accessToken } =
    await generateAccessTokenandRefreshToken(admin._id);

  const user = await User.findById(admin._id).select(
    "-password -refreshToken" //select mehtod will not show refresh token andd password
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
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
        "admin loggedIn successfully"
      )
    );
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

const updateUuser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json(user);
});

const getAllListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find();
  return res.status(200).json(listings);
});

export { adminLogin, getAllUsers, getAllListings };
