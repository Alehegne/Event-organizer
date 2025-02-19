import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/sessionProvider";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["400", "500", "700", "900"],
// });

export const metadata: Metadata = {
  title: "event manager",
  description: "your first go event organizer",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${poppins.variable} antialiased`}>{children}</body> */}
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
