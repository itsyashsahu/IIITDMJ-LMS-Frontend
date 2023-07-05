import { setToken } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

// type Props = {};

const Callback = () => {
  const router = useRouter();
  const currentUrl = router.asPath;
  // console.log("🚀 ~ Callback ~ token:", token)
  const cleanedUrl = currentUrl.replace("/auth/google/callback?", "");
  // const token = "asdf";

  const authQuery = useQuery({
    queryKey: ["auth", "google"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/auth/google/callback?${cleanedUrl}`,
      );
      return response;
    },
    enabled: !!cleanedUrl,
    onSuccess: (data: any) => {
      setToken(data.data);
      router.reload();
    },
    onError: (error: any) => {
      console.log("🚀 ~ submitMutation ~ error", error);
    },
  });

  return (
    <div>
      <p>a;lskdjfas;ldkfj</p>
    </div>
  );
};

export default Callback;
