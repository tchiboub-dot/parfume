"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/components/providers/theme-provider";

export function SiteProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
