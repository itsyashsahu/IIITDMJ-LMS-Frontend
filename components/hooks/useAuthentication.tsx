import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../mantine/AuthProvider";

export default function useAuthentication() {
  const router = useRouter();

  const user = useContext(AuthContext);
  console.log("🚀 ~ useAuthentication ~ user:", user);
  useEffect(() => {
    if (user?.user !== undefined && user?.user !== null) {
      // if user is present, redirect to home page
      router.push("/");
    } else {
      // if user is not present, redirect to login page
      // router.push("/");
    }
  }, [router, user]);
}
