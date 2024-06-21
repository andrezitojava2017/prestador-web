"use client";

import { FreelanceProvider } from "@/context/FreelanceContext";
import { TributoProvider } from "@/context/tributoContext";

const ProvidersApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <TributoProvider>
      <FreelanceProvider>{children}</FreelanceProvider>
    </TributoProvider>
  );
};

export default ProvidersApp;
