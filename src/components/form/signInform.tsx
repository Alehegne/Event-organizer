"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required!")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "password is required!")
    .min(4, "Password must be at least 4 characters long"),
});

export default function SignIn() {
  const { toast } = useToast();
  const router = useRouter();

  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (errorMessage) {
      setError("something went wrong, you may be using the wrong credentials");
    }
  }, [errorMessage]);

  //remove the error message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    // console.log("sing in data", signInData);

    if (signInData?.ok) {
      //add the toasts here
      toast({
        title: "successfully signed in",
        description: "you have successfully signed in",
      });

      router.refresh();
      router.push("/");
    } else {
      toast({
        title: "sign in failed",
        description: "please check your email and password",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form {...form} className="relative">
        <div className=" bg-gray-50 shadow-2xl p-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              Sign in
            </Button>
          </form>
          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          <div className="flex gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                signIn("google", {
                  redirect: true,
                  callbackUrl: "/",
                })
              }
            >
              Sign in With Google
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                signIn("github", {
                  redirect: true,
                  callbackUrl: "/",
                })
              }
            >
              Sign in With Github
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            If you don&apos;t have an account, please&nbsp;
            <Link className="text-blue-500 hover:underline" href="/register">
              Sign up
            </Link>
          </p>
        </div>
      </Form>
      <ErrorMessage>
        {error && <p className="bg-red-500 text-white p-4 rounded">{error}</p>}
      </ErrorMessage>
    </>
  );
}
