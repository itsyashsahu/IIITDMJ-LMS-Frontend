import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie } from "./auth";

let userState: any;
interface UserContextProps {
  user: any;
  loading: boolean;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
});

interface UserProviderProps {
  value: UserContextProps;
  children: React.ReactNode;
}

const User = createContext({ user: null, loading: false });

export const UserProvider: React.FC<UserProviderProps> = ({
  value,
  children,
}) => {
  const { user } = value;

  useEffect(() => {
    if (!value.user && user) {
      // eslint-disable-next-line no-param-reassign
      value.user = user;
    }
  }, [user, value]);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export const useUser = () => useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState || null,
    loading: userState === undefined,
  });

  useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;
    const resolveUser = async () => {
      const user = await getUserFromLocalCookie();
      console.log("🚀 ~ resolveUser ~ user:", user);
      if (isMounted) {
        setUser({ user, loading: false });
      }
    };
    resolveUser();

    // eslint-disable-next-line consistent-return
    return () => {
      isMounted = false;
    };
  }, []);

  return data;
};
