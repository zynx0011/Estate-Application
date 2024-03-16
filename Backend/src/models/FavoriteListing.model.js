import mongoose from "mongoose";

const favoriteListingSchema = new mongoose.Schema(
  {
    listingId: {
      type: String,
      required: true,
      ref: "Listing",
    },
    userRef: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const FavoriteListing = mongoose.model(
  "FavoriteListing",
  favoriteListingSchema
);
