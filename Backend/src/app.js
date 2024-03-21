import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// cross origin resource sharing  - it will check the frontend with port
app.use(
  cors({
    origin: "https://estate-application.vercel.app",
    // origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";
import favoriteListing from "./routes/Favorite.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/listing", listingRouter);
app.use("/api/v1/users/favorite-listing", favoriteListing);

// http://localhost:8000/api/v1/users/register

export { app };
