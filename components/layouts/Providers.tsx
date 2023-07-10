import React, { useEffect } from "react";
import ReactQueyProvider from "@/lib/ReactQueryClientProvider";
import { MantineProvider } from "@mantine/core";
import { useSession } from "next-auth/react";
import graphqlRequestClient from "@/lib/graphqlRequestClient";
import MantineAppShell from "../blocks/AppShell";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (session) {
        graphqlRequestClient.setHeader(
          "authorization",
          `Bearer ${session?.user?.jwt}`,
        );
      }
    }
    return () => {
      isMounted = false;
    };
  }, [session]);

  return (
    <ReactQueyProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <MantineAppShell>{children}</MantineAppShell>
      </MantineProvider>
    </ReactQueyProvider>
  );
};

export default Providers;
