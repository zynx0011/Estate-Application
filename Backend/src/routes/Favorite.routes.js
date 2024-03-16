import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import {
  createFavoriteListing,
  deleteFavoriteListing,
  getFavoriteListings,
} from "../controllers/FavoriteListing.controller.js";

const router = Router();

router
  .route("/favoriteListing/:listingId")
  .get(verifyjwt, createFavoriteListing);

router
  .route("/get/favoriteListing/:userId")
  .get(verifyjwt, getFavoriteListings);

router
  .route("/delete/favoriteListing/:listingId")
  .delete(verifyjwt, deleteFavoriteListing);

export default router;
