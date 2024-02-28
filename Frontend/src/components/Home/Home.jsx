import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../ListingItem";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await axios.get("/api/v1/listing/get?/offer=true&limit=4");
        setOfferListings(res.data.data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await axios.get("/api/v1/listing/get?/type=rent&limit=4");
        setRentListings(res.data.data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await axios.get("/api/v1/listing/get?/type=sale&limit=4");
        setSaleListings(res.data.data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerms", searchTerm);
    const serachQuery = urlParams.toString();
    navigate(`/search?/${serachQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerms");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div>
      {/* top */}
      <div className="relative border-b-2  ">
        <img
          src="https://images.pexels.com/photos/3288103/pexels-photo-3288103.png"
          className="opacity-[0.3] h-[70vh] sm:h-auto object-cover  "
          alt=""
        />
        <div className="absolute top-[35%] left-[12%]  flex  flex-col gap-4 sm:left-[57%]  space-y-5  ">
          {" "}
          <h1 className=" w-full text-4xl sm:text-6xl font-bold ">
            Your Future Home <br className="mb-3" /> &nbsp; &nbsp;&nbsp; &nbsp;
            Is&nbsp;
            <span className="text-white sm:text-4xl text-2xl rounded-lg p-3   bg-amber-900 ">
              Right Here
            </span>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100  sm:bg-transparent sm:border p-3 rounded-lg flex items-center justify-between w-[22vh] sm:w-[50vh] ml-[30%] mt-4 sm:ml-[16%] sm:mt-0"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-14 text-black "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-amber-700" />
            </button>
          </form>
        </div>
      </div>
      <div className="p-6 bg-[#161616]  opacity-100  mt-7   ">
        <h1 className="text-4xl font-bold  text-center">Featured Properties</h1>
      </div>
      {/* swiper */}
      <Swiper
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        className="mt-12"
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[550px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto flex flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <div className="p-3 ">
            <div className="my-3 flex flex-col items-center  border-b-2 ">
              <h2 className="text-4xl font-semibold text-center text-white">
                Recent offers
              </h2>
              <Link
                className="text-xl mb-10 mt-5 text-amber-800 hover:underline "
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-11 items-center justify-center p-5">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3 flex flex-col items-center  border-b-2 ">
              <h2 className="text-4xl font-semibold text-center text-white">
                Recent Places for Rent
              </h2>
              <Link
                className=" text-xl mb-10 mt-5 text-amber-800 hover:underline "
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-11 items-center justify-center p-5">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3 flex flex-col items-center  border-b-2 ">
              <h2 className="text-4xl font-semibold text-center text-white">
                Recent Places For Sale
              </h2>
              <Link
                className=" text-xl mb-10 mt-5 text-amber-800 hover:underline "
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-11 items-center justify-center p-5">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
