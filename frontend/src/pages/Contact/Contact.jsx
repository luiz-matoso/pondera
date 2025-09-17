import React from "react";
import logo from "../../assets/logo_pondera.png";

import Header from "../../components/Header/Header";
import { IoIosPerson } from "react-icons/io";
import { RiFeedbackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

const Contact = () => {
  return (
    <div>
      <Header />

      <div className="flex mt-12 items-center justify-center">
        <div className="py-8 px-12 max-w-md w-full rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-center mb-5 mt-5 "></div>

          <h1 className="text-white font-semibold text-center text-2xl">
            Contact Us
          </h1>
          <p className="mt-2 text-zinc-400 text-center">
            Got a question? Need some help? Get in touch! We value your feedback
            and are ready to assist. Send us a message, and we'll respond
            shortly.
          </p>

          <form onSubmit="">
            <div className="flex mt-10 flex-col gap-4">
              {/* Your name */}
              <div className="relative">
                <input
                  className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 border border-neutral-800 animation-colors"
                  placeholder="Your name..."
                  required
                />
                <IoIosPerson className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              </div>

              {/* Describe */}
              <div className="relative">
                <input
                  className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 p-5 border border-neutral-800"
                  placeholder="Describe your feedback or ..."
                  required
                />
                <RiFeedbackFill className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              </div>
            </div>
            <button
              type="submit"
              className="p-2 mt-6 w-full text-white bg-blue-500 rounded-xl cursor-pointer transition-colors hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
