import React from "react";

export default function About() {
  return (
    <div className=" px-4 py-14 mx-auto relative min-h-screen mb-[10%]">
      <h1 className="text-7xl  max-w-6xl text-center font-bold  mb-11 text-amber-700 ">
        About
      </h1>
      <hr className="mb-10 w-[80%] mx-auto" />
      <div className="p-7 w-[80%] mx-auto">
        <p className="mb-4  font-semibold text-lg w-full">
          Welcome to HomeFinder, your ultimate destination for finding your
          perfect home. Whether you're searching for a cozy apartment, a
          spacious house, or an investment property, HomeFinder is here to
          simplify your real estate journey.
          <br /> <br />
          <strong className="text-amber-700 font-bold"> Mission:</strong> At
          HomeFinder, our mission is to empower individuals and families to
          discover their dream homes with ease and confidence. We're committed
          to providing a seamless and personalized experience, connecting
          buyers, sellers, and renters in a transparent and efficient manner.{" "}
          <br /> <br />{" "}
          <strong className="text-amber-700 font-bold"> Features:</strong>{" "}
          Explore a vast selection of properties, including homes for sale,
          rent, and lease-to-own options. Customize your search with filters for
          price, location, size, amenities, and more to find properties that
          match your criteria. List your property with HomeFinder to reach a
          wide audience of potential buyers and tenants. Connect with trusted
          real estate agents and mortgage professionals for expert guidance and
          assistance. <br /> <br />{" "}
          <strong className="text-amber-700 font-bold"> Benifits:</strong>{" "}
          Experience the convenience and peace of mind that come with using
          HomeFinder: Access to verified property listings with comprehensive
          details and high-quality images. Tools and resources to help you make
          informed decisions, from mortgage calculators to neighborhood
          insights. Time-saving features like saved searches and property alerts
          to keep you updated on new listings. Opportunities to discover hidden
          gems and exclusive deals in the real estate market.
        </p>
      </div>
    </div>
  );
}
