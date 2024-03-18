import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ListingItem from "../components/ListingItem";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const FavoritedLIsting = () => {
  const [FavoritedListing, setFavoritedListing] = useState([]);
  // console.log(FavoritedListing);
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser?.data?.data?.user;

  useEffect(() => {
    const fetchFavoritedListing = async () => {
      try {
        const response = await axios.get(
          `/api/v1/users/favorite-listing/get/favoriteListing/${
            currentUser?._id || user?._id
          }`
        );

        // console.log(response);
        setFavoritedListing(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavoritedListing();
  }, [currentUser._id]);

  const deleteFavoriteListing = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(
        `/api/v1/users/favorite-listing/delete/favoriteListing/${id}`
      );
      setFavoritedListing((prev) => prev.filter((item) => item._id !== id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto relative min-h-screen p-10 ">
      <h1 className="text-4xl md:text-7xl max-w-6xl text-center font-bold mb-6 md:mb-11 text-amber-700 ">
        <span className="text-white">Favorited</span> Listing
      </h1>
      <div className="flex flex-wrap gap-11 items-center justify-center p-5">
        {FavoritedListing.length === 0 && (
          <p className="text-white">No Favorited Listing</p>
        )}
        {FavoritedLIsting &&
          FavoritedListing.map((listing) => (
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] relative">
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={
                    listing.imageUrls[0] ||
                    "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
                  }
                  alt="listing cover"
                  className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                />
              </Link>

              <div className="p-3 flex flex-col gap-2 w-full">
                <p className="truncate text-lg font-semibold text-slate-700">
                  {listing.name}
                </p>
                <div className="flex items-center gap-1">
                  <MdLocationOn className="h-4 w-4 text-green-700" />
                  <p className="text-sm text-gray-600 truncate w-full">
                    {listing.address}
                  </p>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {listing.description}
                </p>
                <p className="text-slate-500 mt-2 font-semibold ">
                  $
                  {listing.offer
                    ? listing.discountPrice.toLocaleString("en-US")
                    : listing.regularPrice.toLocaleString("en-US")}
                  {listing.type === "rent" && " / month"}
                </p>
                <div className="text-slate-700 flex gap-4">
                  <div className="font-bold text-xs">
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} beds `
                      : `${listing.bedrooms} bed `}
                  </div>
                  <div className="font-bold text-xs">
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} baths `
                      : `${listing.bathrooms} bath `}
                  </div>
                </div>
                <div className="flex justify-end -mt-[30px]">
                  <DeleteOutlineIcon
                    onClick={() => deleteFavoriteListing(listing._id)}
                    fontSize="large"
                    className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FavoritedLIsting;
