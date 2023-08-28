"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme({ colors });

export default function SessionWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <div id="wrapper">{children}</div>
        </ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
