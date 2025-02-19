"use client";
import React from "react";
import { navItems } from "./links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const path = usePathname();
  // console.log("path in nav", path);
  return (
    <div className={`hidden md:flex md:gap-8 md:items-center ml-2`}>
      {navItems.map((item, index) => (
        <Link
          href={item.link}
          key={index}
          className={`hover:bg-gray-300 ${
            path === item.link &&
            "bg-muted/50 bg-gradient-to-r from-red-500 to-red-900 text-transparent bg-clip-text font-bold"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
