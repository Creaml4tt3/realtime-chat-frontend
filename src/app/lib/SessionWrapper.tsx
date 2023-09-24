"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const variants = {
    hidden: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.main
              key={pathname}
              variants={variants}
              initial="hidden"
              animate="enter"
              transition={{
                duration: 0.5,
              }}
              id="wrapper"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
