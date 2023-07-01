import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";

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
  // Router.reload();
  window.location.reload();
  // window.rel
};

// eslint-disable-next-line consistent-return
export function getUserFromLocalCookie() {
  // console.log("asdfasdf---- ");

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
