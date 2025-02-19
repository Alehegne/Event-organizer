"use client";
import { AnimatePresence, motion } from "framer-motion";
export default function ErrorMessage({ children }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.5 }}
        className="absolute top-2 left-[25%] bg-gray-50 bg-opacity-50 flex items-center justify-center rounded-sm"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
