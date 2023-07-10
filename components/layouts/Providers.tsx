import React from "react";
import ReactQueyProvider from "@/lib/ReactQueryClientProvider";
import { MantineProvider } from "@mantine/core";
import MantineAppShell from "../mantine/AppShell";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
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
