import React from "react";
import {
  FaEnvelope,
  FaLocationArrow,
  FaPhone,
  FaUser,
  FaVoicemail,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  return (
    <div className="px-4 py-14 mx-auto relative min-h-screen mb-10">
      <h1 className="text-4xl md:text-7xl max-w-6xl text-center font-bold mb-6 md:mb-11 text-amber-700 ">
        <span className="text-white">Contact</span> Us
      </h1>

      <hr className=" md:w-[80%] mx-auto mb-6 md:mb-10" />

      <div className="p-4 grid md:grid-cols-2 gap-6 mt-14 items-center justify-center">
        <div className="bg-amber-700 w-full p-8 md:p-10 rounded-lg mb-6 md:mb-0 md:w-full md:max-w-sm md:ml-[25%]">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 ">
            <span className="text-white">Contact Us</span>
          </h1>
          <div className="flex items-center gap-4 mb-2">
            <FaLocationArrow className="text-2xl text-white" />
            <p className="text-white">Kolkata, India</p>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <FaUser className="text-2xl text-white" />
            <p className="text-white">abc</p>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <FaEnvelope className="text-2xl text-white" />
            <p className="text-white">abc@gmail.com</p>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <FaPhone className="text-2xl text-white" />
            <p className="text-white">+91 123456789</p>
          </div>
        </div>
        <div className="bg-[#242323] w-full p-8 text-amber-600 rounded-lg md:-ml-[34%]">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 ">Get In Touch</h1>
          <div className="div">
            <label className="text-white">Enter Your Name</label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-transparent text-white font-semibold text-sm border-b focus:outline-none mb-4"
            />{" "}
            <label className="text-white">Enter Your Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="w-full p-3 bg-transparent text-white font-semibold border-b text-sm focus:outline-none mb-4"
            />
            <label className="text-white">Enter Your Message</label>
            <textarea
              rows={5}
              placeholder="Message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-transparent text-white border-b font-semibold text-sm focus:outline-none mb-4"
            />
            <Link
              to={`mailto:"abc@gmail.com"?subject=Regarding:"Estate Application"&body=${message}`}
            >
              <button className="w-full p-3 mt-5 bg-amber-700 text-white font-semibold text-sm focus:outline-none">
                Submit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
