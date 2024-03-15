// import React from "react";

// export default function About() {
//   return (
//     <div className=" px-4 py-14 mx-auto relative min-h-screen mb-[10%]">
//       <h1 className="text-7xl  max-w-6xl text-center font-bold  mb-11 text-amber-700 ">
//         About
//       </h1>
//       <hr className="mb-10 w-[80%] mx-auto" />
//       <div className="p-7 w-[80%] mx-auto">
//         <p className="mb-4  font-semibold text-lg w-full">
//           Welcome to HomeFinder, your ultimate destination for finding your
//           perfect home. Whether you're searching for a cozy apartment, a
//           spacious house, or an investment property, HomeFinder is here to
//           simplify your real estate journey.
//           <br /> <br />
//           <strong className="text-amber-700 font-bold"> Mission:</strong> At
//           HomeFinder, our mission is to empower individuals and families to
//           discover their dream homes with ease and confidence. We're committed
//           to providing a seamless and personalized experience, connecting
//           buyers, sellers, and renters in a transparent and efficient manner.{" "}
//           <br /> <br />{" "}
//           <strong className="text-amber-700 font-bold"> Features:</strong>{" "}
//           Explore a vast selection of properties, including homes for sale,
//           rent, and lease-to-own options. Customize your search with filters for
//           price, location, size, amenities, and more to find properties that
//           match your criteria. List your property with HomeFinder to reach a
//           wide audience of potential buyers and tenants. Connect with trusted
//           real estate agents and mortgage professionals for expert guidance and
//           assistance. <br /> <br />{" "}
//           <strong className="text-amber-700 font-bold"> Benifits:</strong>{" "}
//           Experience the convenience and peace of mind that come with using
//           HomeFinder: Access to verified property listings with comprehensive
//           details and high-quality images. Tools and resources to help you make
//           informed decisions, from mortgage calculators to neighborhood
//           insights. Time-saving features like saved searches and property alerts
//           to keep you updated on new listings. Opportunities to discover hidden
//           gems and exclusive deals in the real estate market.
//         </p>
//       </div>
//     </div>
//   );
// }

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const About = () => {
  const [offerListings, setOfferListings] = useState([]);
  // console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await axios.get("/api/v1/listing/get");
        setOfferListings(res.data.data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div className="mx-auto relative min-h-screen ">
      <div className="relative min-h-[50vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/myhq/image/upload/workspaces/bhive11-mohancooperativeindustrialestate/1.jpg)",
            opacity: "0.4", // Adjust opacity as needed
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#ffffff] text-6xl font-bold shadow-lg">
            About <span className="text-amber-700">us</span>
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 mt-[10%]">
        <div className="p-10 flex flex-col gap-11 max-w-[50%]">
          <h1 className="text-[#ffffff] text-6xl font-bold shadow-lg">
            <span className="text-amber-700"> Who</span> We Are
          </h1>
          <p className="text-slate-300 text-xl">
            Reatestate offers comprehensive real estate services, including
            buying, selling, consultancy, and digital marketing. Our team
            analyzes market trends to devise profitable investment plans. With
            our dedicated professionals and innovative platform, we're
            transforming the buying and selling experience, making it seamless
            and intelligent.
          </p>
          <button className="text-amber-700 font-bold p-3 text-2xl max-w-md hover:bg-amber-700 hover:text-white bg-white rounded-xl">
            Explore more
          </button>
        </div>
        <div className="div">
          <img
            src="https://img.freepik.com/free-photo/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working_146671-13569.jpg?w=1060&t=st=1710533014~exp=1710533614~hmac=c0ba57009669ab7c2c305a80fd5f89d2e4ec1cea628cab1f7f290d8bc2fd25d9"
            alt=""
            className="rounded-full object-cover w-[500px] h-[500px] shadow-lg"
          />
        </div>
      </div>
      <div className="div flex flex-col items-center mt-[10%] bg-">
        <h1 className="text-[#ffffff] text-6xl font-bold shadow-lg">
          <span className="text-amber-700"> What</span> We Offer
        </h1>
        <h1 className="text-[#ffffff] text-6xl font-bold shadow-lg">
          <span className="text-amber-700"> For</span> You
        </h1>
      </div>
    </div>
  );
};

export default About;
