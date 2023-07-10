import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "@/styles/globals.css";
import ReactQueyProvider from "@/lib/ReactQueryClientProvider";
import axios from "axios";
import AuthContextProvider from "@/components/mantine/AuthProvider";
import Providers from "@/components/layouts/Providers";
import { SessionProvider } from "next-auth/react";
import { UserProvider, useFetchUser } from "../lib/authContext";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337/";

// axios.defaults.baseURL = BASE_URL;

// export default function App(props: AppProps) {
//   const { Component, pageProps, session } = props;
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Providers>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Providers>
    </>
  );
}
