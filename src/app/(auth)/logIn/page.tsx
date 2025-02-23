import SignIn from "@/components/form/signInform";
import Image from "next/image";

export default function LogIn() {
  return (
    <section className="  text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-12">
        <div className="h-screen min-w-[70%] relative">
          <Image
            src="/assets/images/eventsimage.jpg"
            fill
            className="w-full object-cover"
            alt="login image"
          />
        </div>
        <div className="max-w-lg  p-4 flex justify-center items-center flex-col h-screen">
          <SignIn />
        </div>
      </div>
    </section>
  );
}
