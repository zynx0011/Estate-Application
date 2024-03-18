import { FavoriteListing } from "../models/FavoriteListing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Listing from "../models/listing.model.js";

const createFavoriteListing = asyncHandler(async (req, res) => {
  const { listingId } = req.params;
  //   console.log(listingId, "this is listing id");
  //   console.log(req.user._id, "this is user id");

  if (!listingId || listingId.length === 0) {
    throw new ApiError(400, "userId and listingId are required");
  }

  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new ApiError(400, "Listing not found");
  }

  const exist = await FavoriteListing.findOne({ listingId });

  if (exist) {
    throw new ApiError(400, "Listing already added to favorites");
  }

  const favoriteListing = await FavoriteListing.create({
    listingId,
    userRef: req.user._id,
  });

  return res.status(200).json(new ApiResponse(200, listing, favoriteListing));
});

const getFavoriteListings = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "favoritelistingId are required");
  }

  const favoriteListings = await FavoriteListing.find({
    userRef: req.user._id,
  });

  const listing = await Listing.find({
    _id: { $in: favoriteListings.map((item) => item.listingId) },
  });

  if (!listing) {
    throw new ApiError(404, "No listing found");
  }

  if (!favoriteListings) {
    throw new ApiError(404, "No favorite listings found");
  }

  return res.status(200).json(new ApiResponse(200, listing, favoriteListings));
});

const deleteFavoriteListing = asyncHandler(async (req, res) => {
  const { listingId } = req.params;

  if (!listingId) {
    throw new ApiError(400, "listingId is required");
  }

  const favoriteListing = await FavoriteListing.findOneAndDelete({
    listingId,
    userRef: req.user._id,
  });

  if (!favoriteListing) {
    throw new ApiError(404, "Favorite listing not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Favorite listing deleted successfully"));
});

export { createFavoriteListing, getFavoriteListings, deleteFavoriteListing };
