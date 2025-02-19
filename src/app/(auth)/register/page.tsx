import SignUpForm from "@/components/form/signUpform";
import Image from "next/image";

export default function LogIn() {
  return (
    <section className=" dark:bg-gray-800 text-gray-800 dark:text-gray-100">
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
          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
