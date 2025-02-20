import { signIn } from "next-auth/react";

export default function SignInButton({
  provider,
  children,
}: {
  provider: string;
  children: React.ReactNode;
}) {
  // console.log("provider", provider);
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() =>
        signIn(provider, {
          redirect: true,
          callbackUrl: "/",
        })
      }
    >
      {children}
    </button>
  );
}
