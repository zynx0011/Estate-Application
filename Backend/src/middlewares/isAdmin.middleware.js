// import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import Jwt from "jsonwebtoken";

// export const isAdmin = asyncHandler(async (req, _, next) => {
//   console.log(req.cookies, "this is session"); // Change to req.cookies
//   try {
//     const Token =
//       req.cookies?.accessToken ||
//       req.cookies.refreshToken ||
//       req.header("Authorization")?.replace("Bearer ", "");
//     console.log(Token);
//     if (!Token) {
//       throw new ApiError(404, "Invalid token");
//     }

//     const decoded = Jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);

//     const user = await User.findById(decoded?._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       throw new ApiError(402, "User not found");
//     }

//     req.user = user;

//     // const isAdmin = user?.isAdmin === true;
//     // if (!isAdmin) {
//     //   throw new ApiError(400, "Admin not found");
//     // }
//     next();
//   } catch (error) {
//     throw new ApiError(401, "Invalid token error");
//   }
// });
// <<<<<<<<<<<<<<  ✨ Codeium Command ⭐ >>>>>>>>>>>>>>>>

// Middleware for Admin
export const isAdmin = (req, res, next) => {
  const isAdmin = req.user?.isAdmin === true;

  if (!isAdmin) {
    return next(
      new ApiError(400, "You are not authorized to perform this action")
    );
  }

  next();
};
// <<<<<<<  994d6d5d-0c59-43ef-bfa7-b97b95f11a8e  >>>>>>>
