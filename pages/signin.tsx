import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
// Forms validation Imports
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { setToken } from "@/lib/auth";
import {
  AuthContext,
  AuthUpdateContext,
} from "@/components/mantine/AuthProvider";
import useAuthentication from "@/components/hooks/useAuthentication";
import { BASE_URL } from "./_app";

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
      router.reload();
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

            <Button
              type="button"
              className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z" />
              </svg>
              {/* // eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href={`${BASE_URL}api/connect/google`}>Sign in with Google</a>
            </Button>

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
              <div className="flex items-start justify-between">
                <div className="flex">
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
                <div className="flex items-center h-5">
                  <Link
                    className="text-gray-500 dark:text-gray-300 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="/forget-password"
                  >
                    {/* Terms and Conditions */}
                    Forget Password ?
                  </Link>
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
