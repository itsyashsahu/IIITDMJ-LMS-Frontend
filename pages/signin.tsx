import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
// Forms validation Imports
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { setToken } from "@/lib/auth";

type TSignFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const schema: ZodType<TSignFormData> = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignFormData>({
    resolver: zodResolver(schema),
  });
  const submitMutation = useMutation({
    mutationFn: async (data: TSignFormData) => {
      return axios.post("/api/auth/local", {
        identifier: data.email,
        password: data.password,
      });
    },
    onSuccess: (data: any) => {
      setToken(data.data);
      router.push("/");
    },
    onError: (error: any) => {
      console.log("🚀 ~ submitMutation ~ error", error);
    },
  });

  const submitData = (data: TSignFormData) => {
    console.log("IT WORKED --", data);
    submitMutation.mutate(data);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Custom Header
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <Input
                  {...register("email")}
                  defaultValue="itsyashsahu+2@gmail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
                {errors.email?.message ? <p>{errors.email?.message}</p> : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <Input
                  type="password"
                  defaultValue="strapiPassword"
                  {...register("password")}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {errors.password?.message ? (
                  <p>{errors.password?.message}</p>
                ) : null}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <Link
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="/"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <Button
                onClick={handleSubmit(submitData)}
                className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary-800"
              >
                Login
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
