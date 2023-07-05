import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "@/styles/globals.css";
import ReactQueyProvider from "@/components/ReactQueryClientProvider";
import axios from "axios";
import AuthContextProvider from "@/components/mantine/AuthProvider";
import { UserProvider, useFetchUser } from "../lib/authContext";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337/";

axios.defaults.baseURL = BASE_URL;

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      {/* <UserProvider value={{ user, loading }}> */}
      {/* </UserProvider> */}
      <ReactQueyProvider>
        {/* <AuthContextProvider> */}
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
        {/* </AuthContextProvider> */}
      </ReactQueyProvider>
    </>
  );
}
