import { getTokenFromLocalCookie } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

interface User {
  username: string;
  email: string;
  id: string;
  confirmed: boolean;
  blocked: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: false,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
export const AuthUpdateContext = createContext({} as any);

const AuthContextProvider = ({ children }: Props) => {
  // const [data, setUser] = useState<AuthContextType>(defaultAuthContext);
  // eslint-disable-next-line no-use-before-define
  // const jwt = getTokenFromLocalCookie();

  // const fetchUser = async () => {
  //   const response = await axios.get(`/api/users/me`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   });
  //   return response.data.username;
  // };

  // console.log("Request Started");
  // const user = useQuery({
  //   queryKey: ["user"],
  //   queryFn: fetchUser,
  //   enabled: !!jwt, // Only fetch when jwt is present
  //   cacheTime: 600000, // Cache for 10 minutes
  // });
  // console.log("🚀 ~ AuthContextProvider ~ user:", user);
  // console.log("Request Completed");

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     if (!jwt) {
  //       setUser({
  //         user: null,
  //         loading: false,
  //       });
  //     } else {
  //       // setUser({
  //       //   user: user.data || null,
  //       //   loading: user.isLoading || user.isFetching,
  //       // });
  //     }
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // const { user } = useUserFromLocalCookie();
  // useEffect(() => {
  //   if (userState !== undefined) {
  //     return;
  //   }
  //   let isMounted = true;
  //   setUser({ user, loading: false });
  //   // eslint-disable-next-line consistent-return
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [user]);

  return (
    <AuthContext.Provider value={data}>
      <AuthUpdateContext.Provider value={setUser}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
