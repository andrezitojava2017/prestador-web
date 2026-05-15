"use client";

import { FreelanceProvider } from "@/context/FreelanceContext";
import { TributoProvider } from "@/context/tributoContext";
import { SessionProvider, useSession } from "next-auth/react";
import AuthProvider from "./AuthProvider";

const ProvidersApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <TributoProvider>
        <FreelanceProvider>{children}</FreelanceProvider>
      </TributoProvider>
    </SessionProvider>
  );
};

export default ProvidersApp;
