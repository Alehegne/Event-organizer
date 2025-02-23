"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import MobileNavs from "./navs/mobileNavs";
import NavItems from "./navs/navItems";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [initialHeight, setInitialHeight] = useState(160);

  const session = useSession();
  const router = useRouter();

  //set the heights of the header
  const fixedHeight = 80;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setInitialHeight(fixedHeight);
      } else {
        setInitialHeight(Math.trunc(160 - window.scrollY));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      style={{ height: `${initialHeight}px` }}
      className={`shadow-md transition-all w-full p-4  animate-border-rotate  fixed    z-50`}
    >
      <div className=" w-full h-full rounded-lg">
        <div
          style={{ marginBottom: `600px` }}
          className="flex justify-between rounded-lg  items-center h-full container mx-auto"
        >
          <div
            onClick={() => router.push("/")}
            className="w-[110px] md:w-[200px] h-full relative"
          >
            <Image
              src="/assets/icons/shegerlogo.svg"
              fill
              alt="logo image"
              style={{ objectFit: "contain" }}
            />
          </div>
          <NavItems />
          <div className="flex gap-4 items-center">
            <Button
              onClick={() => {
                if (session.data) {
                  signOut();
                } else {
                  signIn();
                }
              }}
              className="bg-emerald-950 p-4 px-8 rounded-md hover:bg-green-900 hover:scale-105 transition-all font-bold"
            >
              {session.data ? "Log Out" : "Log In"}
            </Button>
            <MobileNavs />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
