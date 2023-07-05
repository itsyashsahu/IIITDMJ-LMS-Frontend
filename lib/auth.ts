import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/components/ReactQueryClientProvider";
// import { BASE_URL } from "@/pages/_app";
import { jwtVerify } from "jose";

export const setToken = (data: any) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  if (Cookies.get("username")) {
    // window.location.pathname("/");
  }
};

export const unsetToken = () => {
  // const Router = useRouter();
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("username");
  console.log("🚀 ~ UnsetToken ~ username:");
};

// eslint-disable-next-line consistent-return
export function getUserFromLocalCookie() {
  // eslint-disable-next-line no-use-before-define
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return axios
      .get(`/api/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((data) => {
        return data.data.username;
      })
      .catch((error) => console.error(error));
  }
}

// eslint-disable-next-line consistent-return
export function getIdFromLocalCookie() {
  // eslint-disable-next-line no-use-before-define
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return axios
      .get(`/api/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((data) => {
        return data.data.id;
      });
  }
}

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};

export const getTokenFromServerCookie = (req: any) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c: any) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwt;
};

export const getIdFromServerCookie = (req: any) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const idCookie = req.headers.cookie
    .split(";")
    .find((c: any) => c.trim().startsWith("id="));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split("=")[1];
  return id;
};

// Cookies Logic for Middlewares

interface UserJwtPayload {
  jti: string;
  iat: number;
}
export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT SECRET KEY is not set.");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Your token has expired. ");
  }
};
