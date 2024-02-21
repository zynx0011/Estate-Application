import Listing from "../models/listing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body);
  return res.status(200).json(listing);
});

const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findByIdAndDelete(req.params.id);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "listing deleted successfully"));
});

const updateListing = asyncHandler(async (req, res) => {
  const listings = await Listing.findById(req.params.id);

  if (!listings) {
    throw new ApiError(404, "Listing not found");
  }

  const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "listing updated successfully"));
});

const getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  return res.status(200).json(new ApiResponse(200, listing, " listing found"));
});

const getListings = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;

  let offer = req.query.offer;

  if (offer === undefined || offer === "false") {
    offer = { $in: [false, true] };
  }

  let furnished = req.query.furnished;

  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [false, true] };
  }

  let parking = req.query.parking;

  if (parking === undefined || parking === "false") {
    parking = { $in: [false, true] };
  }

  let type = req.query.type;

  if (type === undefined || type === false) {
    type = { $in: ["sale", "rent"] };
  }

  const searchTerms = req.query.searchTerms || "";
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";

  const listing = await Listing.find({
    name: { $regex: searchTerms, $options: "i" },
    offer,
    furnished,
    parking,
    type,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  return res.status(200).json(new ApiResponse(200, listing, " listings found"));
});

export { createListing, deleteListing, updateListing, getListing, getListings };
