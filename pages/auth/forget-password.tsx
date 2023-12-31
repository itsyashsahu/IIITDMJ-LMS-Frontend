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
import Cookies from "js-cookie";
import { mainSectionHeight } from "@/components/blocks/AppShell";

type TForgetPasswordFormData = {
  email: string;
};

export default function ForgetPassword() {
  const router = useRouter();
  const schema: ZodType<TForgetPasswordFormData> = z.object({
    email: z.string().email(),
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgetPasswordFormData>({
    resolver: zodResolver(schema),
  });
  const email = watch("email");
  const submitMutation = useMutation({
    mutationFn: async (data: TForgetPasswordFormData) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`,
        {
          email: data.email,
        },
      );
    },
    onSuccess: (data: any) => {
      Cookies.set("userEmail", email);
      router.push("/auth/password-reset-link-sent");
    },
    onError: (error: any) => {
      console.log("🚀 ~ submitMutation ~ error", error);
    },
  });

  const submitData = (data: TForgetPasswordFormData) => {
    // console.log("IT WORKED --", data);
    submitMutation.mutate(data);
  };

  return (
    <section
      style={{ height: mainSectionHeight }}
      className="bg-gray-50 dark:bg-gray-900 grid place-items-center"
    >
      <div className="flex flex-col items-center justify-center px-6 py-5 mx-auto lg:py-0">
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
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              A password reset link will be sent to your email.
            </p>

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

              <Button
                onClick={handleSubmit(submitData)}
                className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary-800"
              >
                Send Reset Link
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
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
