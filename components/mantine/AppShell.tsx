/* eslint-disable react/jsx-no-useless-fragment */
import { AppShell, Navbar, Header, ScrollArea } from "@mantine/core";
import useSidebarStore from "@/store/sidebarStore.ts";
import useOnClientStore from "@/store/useOnClientStore.ts";
import CustomHeader from "./CustomHeader.tsx";
import CustomNavbar from "./CustomNavbar.tsx";

export default function MantineAppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // const sidebarState = useSidebarStore((state) => state.state);
  const sidebarState = useOnClientStore(
    useSidebarStore,
    (state) => state.state,
  );
  // const sidebarState = true;
  return (
    <AppShell
      // hidden
      // padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={
        <>
          {sidebarState ? (
            <Navbar
              hidden={!sidebarState}
              hiddenBreakpoint="sm"
              width={{ base: 300 }}
              height="92vh"
              zIndex={10}
            >
              <CustomNavbar />
            </Navbar>
          ) : null}
        </>
      }
      header={
        <Header height="8vh">
          <CustomHeader />
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <ScrollArea
        style={{
          height: "calc(92vh - 2rem)",
        }}
      >
        {children}
      </ScrollArea>
    </AppShell>
  );
}
