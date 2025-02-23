"use client";
import { useState } from "react";
import { Input } from "../ui/input";

type props = {
  type: string;
  placeholder: string;
};

export default function CustomInput({ type, placeholder }: props) {
  const [enlarge, setEnlarge] = useState(false);

  const handleFocus = () => {
    setEnlarge(true);
  };

  const handleBlur = () => {
    setEnlarge(false);
  };

  return (
    <Input
      className={`${enlarge ? "w-full" : "w-full md:w-1/2"} transition-all`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      type={type}
      placeholder={placeholder}
    />
  );
}
