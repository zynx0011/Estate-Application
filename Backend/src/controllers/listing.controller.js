import Listing from "../models/listing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body);
  return res.status(200).json(listing);
});

export { createListing };
