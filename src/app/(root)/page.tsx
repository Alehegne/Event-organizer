import Events from "@/components/sections/Events";
import HeroSection from "@/components/sections/HeroSection";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log("session", session);

  // if (!session) {
  //   redirect("/logIn");
  // }
  return (
    <section>
      <main>
        {/* HeroSection */}
        <HeroSection />

        {/* events section */}
        <Events />
      </main>
    </section>
  );
}
