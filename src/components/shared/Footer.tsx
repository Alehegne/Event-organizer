import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mb-1 pb-1 px-10">
      <div className="h-[100px] flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4">
        <Link href="/" className="w-[100px] md:w-[200px] h-full relative">
          <Image
            src="/assets/icons/shegerlogo.svg"
            fill
            alt="logo image"
            style={{ objectFit: "contain" }}
          />
        </Link>
        <div>
          <p>2023.all rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
