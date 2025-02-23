"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "Seamless Event Booking & Ticketing",
    content:
      "For paid events, we provide a hassle-free ticketing system that allows attendees to purchase tickets directly from the event page. Our secure payment integration ensures a smooth and safe transaction process. Event organizers can track ticket sales, manage attendees, and even offer discounts or early-bird promotions to boost participation. Whether it’s a concert, business seminar, or festival, Sheger Post simplifies event ticketing like never before!",
    image: "/assets/images/hero2.png",
  },
  {
    title: "Free & Paid Event Listings for Everyone",
    content:
      "Not all events are the same, and we understand that! Sheger Post gives you the flexibility to list both free and paid events, making it accessible for everyone. Whether you're hosting a community gathering or an exclusive VIP event, our platform ensures that your audience finds you easily. Plus, event organizers can boost their paid events with featured listings for better visibility, reaching thousands of interested attendees.",
    image: "/assets/images/hero3.png",
  },
  {
    title: "Stay Updated with Trending Events",
    content:
      "Never miss an event again! With Sheger Post, you can explore the latest and most popular events happening around Ethiopia. Our homepage features a “Trending Events” section, highlighting must-attend concerts, cultural shows, business meetups, and educational workshops. With our smart recommendation system, you’ll get event suggestions based on your interests and location, making it effortless to find events that matter to you.",
    image: "/assets/images/hero4.png",
  },
  {
    title: "Discover & Post Events Easily",
    content:
      "Sheger Post is your go-to platform for discovering and sharing events in Ethiopia. Whether it's music concerts, business expos, traditional festivals, or networking events, we bring you the best opportunities to connect with people. Our platform allows users to post events for free or as paid listings, making it easy to reach the right audience. With our intuitive and user-friendly design, anyone can create, manage, and promote events within minutes.",
    image: "/assets/images/hero1.png",
  },
];

const cardVariants: Variants = {
  offscreen: {
    y: 100,
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

const HeroSection2 = () => {
  return (
    <section className="w-full h-full overflow-hidden relative  mt-40">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="h-[100vh] px-8 relative  w-full bg-[#2E9E9E] flex justify-start flex-col md:justify-center md:flex-row items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative"
        >
          <Image
            src="/assets/images/apple.png"
            width={900}
            height={900}
            alt="hero image"
            className="object-cover"
          />
        </motion.div>

        <div className="flex flex-col gap-2 md:gap-8 ">
          <motion.h1
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1, delay: 0.5 }}
            className="text-[96px] text-white demotext font-bold "
          >
            Sheger Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 1 }}
            className="text-white text-wrap italic text-[28px]"
          >
            Source for all events in Sheger
          </motion.p>
          <Link
            href="/events"
            className=" text-center hover:scale-105 active:scale-100 transition-all bg-green-400 rounded-3xl p-2 px-8"
          >
            Explore Events
          </Link>
        </div>
      </motion.div>
      {sections.map((section, index) => (
        <motion.div
          initial={{ opacity: 0, x: 3 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          key={index}
          className=" h-[110vh] w-full overflow-hidden"
        >
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
            className="relative h-full w-full"
          >
            <div
              style={{
                backgroundImage: `url(${section.image})`,
                backgroundAttachment: "fixed",
              }}
              className="w-full h-full bg-cover bg-center bg-no-repeat "
            />
            <div className="absolute top-0 left-0 flex w-full h-full text-wrap z-30">
              <div className=" z-30  w-1/2 p-4 hover:-rotate-3 content-start">
                <motion.h1
                  variants={cardVariants}
                  className="text-[96px] cardBg  text-[#236E90] header   rounded-2xl   font-bold w-full"
                >
                  {section.title}
                </motion.h1>
              </div>
              <div className=" content-end hover:rotate-3 transition-all   z-30 w-1/2 overflow-hidden ">
                <motion.p
                  variants={cardVariants}
                  className="cardBg  rounded-3xl  mb-20  px-4  text-wrap italic text-white  py-2 w-full text-md text-[28px] backdrop:blur-3xl"
                >
                  {section.content}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
};
export default HeroSection2;
