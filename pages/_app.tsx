import { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";
import Providers from "@/components/layouts/Providers";
import { SessionProvider } from "next-auth/react";

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
      <SessionProvider session={session}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </SessionProvider>
    </>
  );
}
