import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ApprovalIcon from "@mui/icons-material/Approval";
import KeyIcon from "@mui/icons-material/Key";
import { Link } from "react-router-dom";

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
      <div className="relative min-h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/myhq/image/upload/workspaces/bhive11-mohancooperativeindustrialestate/1.jpg)",
            opacity: "0.4", // Adjust opacity as needed
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50 border-b-2"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#ffffff] text-6xl font-bold shadow-lg">
            About <span className="text-amber-700">us</span>
          </h1>
        </div>
      </div>

      <div className="p-10">
        <div>
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <div className="space-y-2 mb-14">
                <div className="text-center text-6xl font-bold text-white ">
                  Welcome to<span className="text-amber-700"> Our Story</span>
                </div>
                <div className="text-center max-w-3xl mx-auto text-gray-300 ">
                  Discover how we are shaping the future of collaboration and
                  innovation.
                </div>
              </div>
              <div className="space-y-4  bg-[#f3f4f6]  rounded-xl p-10 ">
                <div className="space-y-2  ">
                  <div className="text-2xl font-semibold text-black  mb-20 ">
                    Meet Our Team
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 lg:gap-6 text-black ">
                    <div className="space-y-2 sm:border-r-2 border-black min-h-[200px] m-6">
                      <div className="flex items-center space-x-4">
                        <img
                          alt="Portrait of Sara Smith"
                          className="rounded-full"
                          height="80"
                          src="https://remake.world/wp-content/uploads/2019/11/GinaBibby_537-Edit.jpg"
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          width="80"
                        />
                        <div className="space-y-1.5">
                          <div className="text-lg font-semibold ">
                            Sara Smith
                          </div>
                          <div className="text-gray-500">Product Manager</div>
                        </div>
                      </div>
                      <div className="space-y-2 ">
                        <p>
                          Sara is passionate about building products that
                          delight customers. She previously worked at a
                          fast-growing startup where she learned the value of
                          iteration and customer feedback.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4 m-6">
                        <img
                          alt="Portrait of Alex Johnson"
                          className="rounded-full"
                          height="80"
                          src="https://alexjohnson.me/nextImageExportOptimizer/alex-johnson-headshot-opt-750.WEBP"
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          width="80"
                        />
                        <div className="space-y-1.5">
                          <div className="text-lg font-semibold ">
                            Alex Johnson
                          </div>
                          <div className="text-gray-500">Software Engineer</div>
                        </div>
                      </div>
                      <div className="space-y-2 ">
                        <p>
                          Alex is a full-stack developer with a love for elegant
                          code. He's always exploring new technologies and
                          enjoys collaborating with his team to solve complex
                          problems.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-black">
                  <div className="text-2xl font-semibold ">Our Vision</div>
                  <div className="text-gray-700">
                    <p>
                      At our core, we believe that great things happen when
                      people work together. Our vision is to provide the tools
                      and platform that enable teams to collaborate effectively,
                      communicate seamlessly, and achieve more than they ever
                      thought possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-[10%] w-[80%] mx-auto" />

      <div className="flex flex-col sm:flex-row items-center justify-center p-6 mt-[10%]">
        <div className="p-10 flex flex-col gap-11 sm:max-w-[50%]">
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
      <hr className="mt-[10%] w-[80%] mx-auto mb-10" />
      <section className="py-12.5 lg:py-20 bg-[#161616]  dark:bg-gray-800">
        <div className="container px-4">
          <div className="grid gap-12.5 lg:gap-20 items-center space-y-10 lg:space-y-0 lg:grid-cols-2 mb-9 ">
            <div className="space-y-5  ">
              <h2 className="text-3xl font-bold tracking-tight  dark:text-gray-50">
                Properties Showcase
              </h2>
              <p className="text-gray-500 md:w-[90%] xl:w-[80%]">
                Explore our curated selection of exquisite properties that
                redefine luxury living.
              </p>
            </div>
            <div className="space-y-5 ">
              <h2 className="text-3xl font-bold tracking-tight dark:text-gray-50">
                Real Estate Solutions
              </h2>
              <p className="text-gray-500 md:w-[90%] xl:w-[80%]">
                Providing innovative real estate solutions tailored to your
                needs for a seamless experience.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-10 items-start">
            <div className="flex flex-col items-center space-y-2.5 bg-white dark:bg-gray-700 p-4 rounded-xl border-black border-2  ">
              <HomeIcon className="bg-black h-12 hover:cursor-pointer " />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Luxury Homes
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Discover exclusive luxury homes designed for the most discerning
                buyers.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2.5 bg-white dark:bg-gray-700 p-4 rounded-xl border-black border-2">
              <ApartmentIcon className="bg-black h-12 hover:cursor-pointer " />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Commercial Spaces
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Explore prime commercial spaces ideal for businesses looking to
                thrive.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2.5 bg-white dark:bg-gray-700 p-4 rounded-xl border-black border-2">
              <ApprovalIcon className="bg-black h-12 hover:cursor-pointer " />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Land Investments
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Invest in promising land opportunities for future development
                projects.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2.5 bg-white dark:bg-gray-700 p-4 rounded-xl border-black border-2">
              <KeyIcon className="bg-black h-12 hover:cursor-pointer " />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Estate Management
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Comprehensive estate management services for hassle-free
                property ownership.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2.5 bg-white dark:bg-gray-700 p-4 rounded-xl border-black border-2">
              <Diversity1Icon className="bg-black h-12 hover:cursor-pointer " />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Key Partnerships
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Building strong partnerships to deliver exceptional real estate
                solutions.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2.5 bg-white dark:bg-gray-700 p-4 rounded-xl border-black border-2 ">
              <Diversity1Icon className="bg-black h-12 hover:cursor-pointer " />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Client Relationships
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Nurturing client relationships with trust, integrity, and
                transparency.
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr className="mt-[10%] w-[80%] mx-auto" />
      <div className="div flex flex-col items-center mt-[10%] ">
        <h1 className="text-[#ffffff] text-6xl font-bold shadow-lg">
          <span className="text-amber-700"> What</span> We Offer
        </h1>
        <h1 className="text-[#ffffff] text-6xl font-bold shadow-lg">
          <span className="text-amber-700"> For</span> You
        </h1>
        <p className="text-slate-300 text-lg max-w-5xl mt-[5%]">
          EstateWeb is dedicated to providing top-quality services in buying,
          selling, consultancy, and marketing, with a focus on innovation,
          sustainability, and customer care. With offices in Lahore and
          Islamabad, our integrated approach includes creating investment
          portfolios, analyzing market risks, and implementing effective digital
          marketing strategies. We prioritize our clients' needs and aim for
          continued expansion while maintaining strong community relationships.
          Our commitment is to build a world-class real estate agency that
          offers innovative products and sustainable solutions
        </p>
        <p className="text-slate-300 text-lg max-w-5xl ">
          our integrated approach includes creating investment portfolios,
          analyzing market risks, and implementing effective digital marketing
          strategies. We prioritize our clients
        </p>
      </div>
      <hr className="mt-[10%] w-[80%] mx-auto" />
      <div className="flex  justify-around sm:m-10 items-center p-10">
        <div className="div">
          <h1 className="text-4xl sm:w-[80%] font-bold">
            Streamline your business operations and maximize cost-efficiency
            with our trusted services
          </h1>
          <p className="mt-5 w-[80%] text-slate-400">
            Real Estate welcome all customer to do business with us. We gives
            you 100% satisfaction deals. Our customer are always happy and
            satisfied with us. Limited time deals are also available. Gives us a
            call and we will help you to secure your dream.
          </p>

          <h1 className="text-3xl font-bold mt-5">Call for book an order:</h1>
          <div className="flex justify-evenly mt-8 mr-[15%]">
            <p className="border hidden sm:block border-amber-500  p-4 font-bold  text-center text-xl rounded-full  mt-5">
              +91 9876543210
            </p>
            <Link
              to={"/contact"}
              className="bg-amber-500 text-white p-4 font-bold sm:w-[30%] text-center  text-xl rounded-full  mt-5 "
            >
              Contact Us{" "}
            </Link>
          </div>
        </div>
        <div className="div">
          <img
            src="https://www.fujitsu.com/us/imagesgig5/contactus_tcm127-6317963_tcm127-6286607-32.jpg"
            alt="img"
            className="rounded-3xl hidden sm:block"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
