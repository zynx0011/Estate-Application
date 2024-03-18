import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListingItem from "../ListingItem";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const testimonialList = [
    {
      author: {
        fullName: "Akshay Kumar",
        picture:
          "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
      },
      rating: 3.5,
      description:
        "Subdue light after. Fruitful hath had day give called seasons unto tree he days. And can't greater them dry living.",
    },
    {
      author: {
        fullName: "Raima Sen",
        picture:
          "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
      },
      rating: 4,
      description:
        "Fruit. Night. Can't lesser open their, had kind doesn't itself thing wherein spirit fowl, she'd darkness fish place heaven saying.",
    },
    {
      author: {
        fullName: "Arjun Kapur",
        picture:
          "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
      },
      rating: 5,
      description:
        "It fourth, whose light spirit in, was make it morning seas moved it void fill upon dominion. Female sea set.",
    },
  ];

  const Rating = ({ rating, showLabel, className, ...rest }) => (
    <p className={classNames("mb-6", className)} {...rest}>
      <span>
        {[...Array(5)].map((_, i) => {
          const index = i + 1;
          let content = "";
          if (index <= Math.floor(rating))
            content = (
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            );
          else if (rating > i && rating < index + 1)
            content = (
              <FontAwesomeIcon
                icon={faStarHalfAlt}
                className="text-yellow-500"
              />
            );
          else if (index > rating)
            content = (
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-200 dark:text-opacity-20"
              />
            );

          return <Fragment key={i}>{content}</Fragment>;
        })}
      </span>
      {showLabel && <span>{rating.toFixed(1)}</span>}
    </p>
  );

  Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    showLabel: PropTypes.bool,
    className: PropTypes.string,
  };

  const TestimonialItem = ({ testimonial }) => (
    <div className="bg-white dark:bg-slate-800 shadow-xl p-6 lg:p-12 h-full">
      <img
        src={testimonial.author.picture}
        alt={testimonial.author.fullName}
        className="max-w-full h-auto rounded-full border mb-6 mx-auto"
        width="100"
      />
      <h4 className="font-medium text-2xl mb-2">
        {testimonial.author.fullName}
      </h4>
      <Rating rating={testimonial.rating} showLabel={false} />

      <p className="opacity-80">{testimonial.description}</p>
    </div>
  );

  TestimonialItem.propTypes = {
    testimonial: PropTypes.object.isRequired,
  };
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
              className="bg-transparent focus:outline-none w-14 rounded-full "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-amber-700" />
            </button>
          </form>
        </div>
      </div>

      {/* second section  */}
      <div className="flex  justify-around m-10 items-center p-10">
        <div className="div">
          <h1 className="text-4xl font-bold">
            Save your time and money by doing comfort business with us
          </h1>
          <p className="mt-5 w-[80%] text-slate-400">
            Real Estate welcome all customer to do business with us. We gives
            you 100% satisfaction deals. Our customer are always happy and
            satisfied with us. Limited time deals are also available. Gives us a
            call and we will help you to secure your dream.
          </p>

          <h1 className="text-3xl font-bold mt-5">Call for book an order:</h1>
          <div className="flex  sm:justify-evenly mt-8 mr-[15%]">
            <p className="border border-amber-500 hidden sm:block p-4 font-bold  text-center text-xl rounded-full  mt-5">
              +91 9876543210
            </p>
            <Link
              to={"/contact"}
              className="bg-amber-500 text-white p-4 font-bold sm:w-[30%] text-center text-xl rounded-full  mt-5  mr-7"
            >
              Book Now{" "}
            </Link>
          </div>
        </div>
        <div className="div">
          <img
            src="https://res.cloudinary.com/myhq/image/upload/workspaces/bhive11-mohancooperativeindustrialestate/1.jpg"
            alt="img"
            className="rounded-3xl hidden sm:block"
          />
        </div>
      </div>

      {/* third section  */}
      <div className="p-6 bg-[#161616]  opacity-100  mt-7   ">
        <h1 className="text-4xl font-bold  text-center mb-9">
          Current projects and More
        </h1>
        <hr className="w-[80%] mx-auto" />
      </div>
      {/* swiper */}
      <div className="flex flex-col p-7 gap-6 sm:flex-row justify-evenly items-center">
        <div className="">
          <img
            src="https://www.caycon.com/wp-content/uploads/2019/10/become-a-residential-real-estate-developer.jpg"
            alt=""
            className="rounded-full w-[300px] h-[300px] object-cover hover:scale-105 transition-scale duration-300"
          />
        </div>
        <div className="div">
          {" "}
          <img
            src="https://www.housingevolutions.eu/files/2019/09/aftrap-scholenproject-Bleijerheide-8-9-2016-5-1024x683.jpg"
            alt=""
            className="rounded-full w-[300px] h-[300px] object-cover hover:scale-105 transition-scale duration-300"
          />
        </div>
        <div className="div">
          {" "}
          <img
            src="https://www.housingevolutions.eu/files/2019/09/Uithijsmoment-SUPERLOCAL-01.11.2017-1a.jpg"
            alt=""
            className="rounded-full w-[300px] h-[300px] object-cover hover:scale-105 transition-scale duration-300"
          />
        </div>
      </div>

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

        {/* testimonial */}
        <section className="ezy__testimonial8 dark py-14 md:py-24 text-white   dark:text-white z-[1] relative overflow-hidden">
          <div className="container px-4 mx-auto relative">
            <div className="flex mb-6 lg:mb-12 ">
              <div className="max-w-full ">
                <h2 className="text-3xl leading-none md:text-[45px] font-bold mb-6">
                  What customer think about us
                </h2>
                <p className="text-lg opacity-80 ">
                  Assumenda non repellendus distinctio nihil dicta sapiente,
                  quibusdam maiores, illum at, aliquid blanditiis eligendi qui.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              {testimonialList.map((testimonial, i) => (
                <div
                  className="col-span-3 md:col-span-1 text-white  rounded-lg hover:scale-105 transition-scale duration-300 "
                  key={i}
                >
                  <TestimonialItem
                    testimonial={testimonial}
                    className=" rounded-lg hover:scale-105 transition-scale duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
