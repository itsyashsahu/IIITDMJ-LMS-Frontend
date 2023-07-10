import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

// type Props = {};

const Callback = () => {
  const router = useRouter();
  const currentUrl = router.asPath;
  const cleanedUrl = currentUrl.replace("/auth/google/callback?", "");
  useQuery({
    queryKey: ["auth", "google"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/callback?${cleanedUrl}`,
      );
      return response;
    },
    enabled: !!cleanedUrl,
    onSuccess: async (data: any) => {
      const { jwt } = data.data;
      await signIn("credentials", {
        identifier: "",
        password: "",
        byPass: "true",
        jwt,
        redirect: true,
        callbackUrl: "/",
      });
    },
    onError: (error: any) => {
      console.log("🚀 ~ submitMutation ~ error", error);
    },
  });

  return (
    <div>
      <p>Loading</p>
    </div>
  );
};

export default Callback;
