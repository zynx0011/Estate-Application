import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";
import { BASE_URL } from "../Config/config";
// import Rating from "@mui/material/Rating";
import { BsStarFill, BsStar, BsCloudLightning } from "react-icons/bs";

const ListingPg = () => {
  const params = useParams();
  // console.log(useParams());
  const { currentUser } = useSelector((state) => state.auth);
  const data = currentUser?.data?.data?.user;
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [rating, setRating] = useState(true);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [favorite, setFavorite] = useState([]);
  // console.log(checkFavorite);
  const { listingId } = useParams();
  console.log(rating);

  // console.log(formData);
  SwiperCore.use([Navigation]);

  const sumbitHandlerFavorite = async (e) => {
    e.preventDefault();
    setRating(!rating);
    // console.log(listingId, "this is listing id");

    // if (rating && rating === true) {
    try {
      // console.log(listingId, "this is listing id");

      const res = await axios.get(
        `${BASE_URL}/api/v1/users/favorite-listing/favoriteListing/${listingId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setRating(false);
      setCheckFavorite(true);
    } catch (error) {
      console.log(error);
      setCheckFavorite(false);
      // }
    }
  };

  // console.log(favorite);

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/users/favorite-listing/get/favoriteListing/${
            currentUser?._id || data?._id
          }`,
          {
            withCredentials: true,
          }
        );

        // const data2 = res?.data?.data.forEach((element) => {
        //   setFavorite(data2);
        // });

        const dataFromAPI = res?.data?.data;
        if (dataFromAPI && dataFromAPI.length > 0) {
          const favoritesData = dataFromAPI.map((element) => {
            return element; // Assuming `favorite` is the field you want to set in state
          });
          setFavorite(favoritesData);
        }
        // console.log(
        //   favorite.forEach((element) => console.log(element.userRef))
        // );
        // console.log(data?._id, "s");

        favorite?.map((item) =>
          item.userRef === data?._id || currentUser?._id
            ? setRating(false)
            : setRating(true)
        );
        console.log(rating);
        // if (favorite?.find((item) => item._id === listingId)) {
        //   setRating(false);
        // }
      } catch (error) {
        console.log(error);
        setRating(true);
      }
    };
    fetchFavorite();
  }, [listingId]);

  console.log(
    favorite.map((element) => element.userRef === data?._id || currentUser?._id)
      ? true
      : false
  );

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const listingId = params.listingId;
        const res = await axios.get(
          `${BASE_URL}/api/v1/listing/get/${listingId}`,
          {
            withCredentials: true,
          }
        );

        // console.log(res.data.data);
        setFormData(res.data.data);
        // if (formData.imageUrls.length === 0) {
        //   console.log("here");
        //   return setError("Please add at least one image");
        // }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && (
        <h1 className="text-center font-bold text-2xl">Loading....</h1>
      )}
      {error && (
        <h1 className="text-center text-red-600 font-bold text-2xl">
          Something went wrong
        </h1>
      )}
      {formData && !loading && !error && (
        <div className="div">
          {formData.imageUrls && (
            <Swiper navigation>
              {formData.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className="flex flex-col  items-center mr-[27%]">
            <h1 className=" font-semibold text-3xl flex gap-7 p-10 mr-[20%]  ">
              {formData.name}
              <span
                className="flex justify-center items-center "
                onClick={sumbitHandlerFavorite}
                style={{
                  cursor: "pointer",
                  color: rating ? "gray" : "gold",
                  fontSize: "2.5rem",
                }}
              >
                {rating ? <BsStarFill /> : <BsStar />}
                {/* &#9733; */}
              </span>
            </h1>

            <h1 className=" font-semibold text-xl m-auto ml-[30%] text-gray-500">
              {formData.description}
            </h1>
          </div>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {formData.name} - ${" "}
              {formData.offer ? formData.discountPrice : formData.regularPrice}
              {formData.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {formData.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {formData.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {formData.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+formData.regularPrice - +formData.discountPrice} OFF
                </p>
              )}
              {/* <Rating
                name="simple-controlled"
                size="large"
                value={rating}
                className={`bg-white ${
                  rating ? "text-red-500" : "text-yellow-500"
                }`}
                onClick={sumbitHandlerFavorite}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                max={1} // Set max prop to 1 to display only one star
              /> */}
            </div>

            <p className="">
              <span className="font-bold ">Description - </span>
              {formData.description}
            </p>
            <ul className="text-green-500 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {formData.bedrooms > 1
                  ? `${formData.bedrooms} beds `
                  : `${formData.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {formData.bathrooms > 1
                  ? `${formData.bathrooms} baths `
                  : `${formData.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {formData.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {formData.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser &&
              formData?.userRef !== (currentUser?._id || data?._id) &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                >
                  Contact landlord
                </button>
              )}
            {contact && <Contact formdata={formData} />}
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10005803.565863715!2d-127.06750599826638!3d36.000460265333004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1710763872121!5m2!1sen!2sin"
            width="600"
            height="450"
            // style="border:0;"
            className="w-full h-[300px] sm:h-[700px] object-cover"
            allowfullscreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </main>
  );
};

export default ListingPg;
