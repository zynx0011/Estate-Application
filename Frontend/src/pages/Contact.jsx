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
    <div className=" px-4 py-14 mx-auto relative min-h-screen mb-[10%]">
      <h1 className="text-7xl  max-w-6xl text-center font-bold  mb-11 text-amber-700 ">
        <span className="text-white"> Contact</span> Us
      </h1>

      <hr className="w-[80%] mx-auto mb-10" />

      <div className="p-4">
        <div className="bg-amber-700 w-full p-16 rounded-lg z-0 ">
          <h1 className="text-3xl font-bold mb-4 ">
            <span className="text-white">Contact Us</span>
            <hr className="w-[50%] mt-5 " />
          </h1>
          <div className="flex items-center gap-4 p-4">
            <FaLocationArrow className="text-2xl text-white" />
            <p className="text-white">Kolkata, India</p>
          </div>
          <div className="flex items-center gap-4 p-4">
            <FaUser className="text-2xl text-white" />
            <p className="text-white">abc</p>
          </div>
          <div className="flex items-center gap-4 p-4">
            <FaEnvelope className="text-2xl text-white" />
            <p className="text-white">abc@gmail.com</p>
          </div>
          <div className="flex items-center gap-4 p-4">
            <FaPhone className="text-2xl text-white" />
            <p className="text-white">+91 123456789</p>
          </div>
        </div>
        <div className="w-[60%] p-14 text-amber-600  bg-[#242323] rounded-lg  z-10 absolute  top-[37%] right-8">
          <h1 className="text-3xl font-bold mb-4 ">Get In Touch</h1>
          <div className="div">
            <label>Enter Your Name</label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-transparent text-white font-semibold text-sm focus:outline-none"
            />{" "}
            <hr className="w-full opacity-[0.5] border border-black" />
            <label>Enter Your Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="w-full p-3 bg-transparent text-white font-semibold text-sm focus:outline-none"
            />
            <hr className="w-full opacity-[0.5] border border-black" />
            <label>Enter Your Message</label>
            <textarea
              type="text"
              rows={5}
              placeholder="Meassage"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-transparent text-white font-semibold text-sm focus:outline-none"
            />
            <hr className="w-full opacity-[0.5] border border-black" />
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
