import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

// NextAuth() returns a request handler, so we don't need to set a type manually
const handler = NextAuth(authOptions);

// Export as API route handlers for Next.js
export const GET = handler;
export const POST = handler;
