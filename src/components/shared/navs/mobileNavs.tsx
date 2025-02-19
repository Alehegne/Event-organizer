"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "./links";
import { usePathname } from "next/navigation";

export default function MobileNavs() {
  const path = usePathname();
  // console.log("path", path);
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="hover:scale-105 transition-all hover:bg-muted/20 md:hidden" />
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="sr-only">menu icon</SheetTitle>
        </SheetHeader>
        <div className="">
          <ul className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src="/assets/images/logo.svg"
                width={60}
                height={60}
                alt="logo image"
                style={{ objectFit: "contain" }}
              />
            </Link>
            {navItems.map((item, index) => (
              <Link
                href={item.link}
                className={`hover:bg-muted/5 hover:text-black rounded-sm transition-all ${
                  path === item.link &&
                  "bg-muted/50 bg-gradient-to-r from-violet-900 to-violet-950 text-transparent bg-clip-text"
                }`}
                key={index}
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
