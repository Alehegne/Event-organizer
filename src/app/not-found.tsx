"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-6xl bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
          404
        </h1>
        <p>There is something wrong going</p>
        <div className="flex gap-4">
          <Button
            onClick={() => router.refresh()}
            className="bg-purple-600 hover:bg-purple-500 hover:scale-105 active:scale-100 transition-all p-3"
          >
            Refresh The page
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="bg-purple-600 hover:bg-purple-500 px-10 hover:scale-105 active:scale-100 transition-all p-3"
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
