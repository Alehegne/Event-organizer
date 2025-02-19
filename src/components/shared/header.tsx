"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import MobileNavs from "./navs/mobileNavs";
import NavItems from "./navs/navItems";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();

  const [headerHeight, setHeaderHeight] = useState(150);

  const minHeight = 100; // Minimum height in pixels

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newHeight = Math.max(150 - scrollPosition * 0.4, minHeight);
      setHeaderHeight(newHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="shadow-md w-full transition-all sticky top-0 bg-white z-10"
      style={{ height: `${headerHeight}px` }}
    >
      <div className="flex justify-between items-center h-full container mx-auto">
        <Link href="/" className="w-[100px] md:w-[200px] h-full relative">
          <Image
            src="/assets/images/logo.svg"
            fill
            alt="logo image"
            style={{ objectFit: "contain" }}
          />
        </Link>
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
            className="bg-purple-700 rounded-xl hover:bg-purple-600 hover:scale-105 transition-all font-bold"
          >
            {session.data ? "Log Out" : "Log In"}
          </Button>
          <MobileNavs />
        </div>
      </div>
    </header>
  );
};

export default Header;
