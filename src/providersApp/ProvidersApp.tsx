'use client';

import { TributoProvider } from "@/context/tributoContext";

const ProvidersApp = ({ children }: { children: React.ReactNode }) => {

    return (
        <TributoProvider>

            {children}
        </TributoProvider>
    )
}

export default ProvidersApp;