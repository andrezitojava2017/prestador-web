"use client";
import { Flex, HStack } from "@chakra-ui/react";
import BarraNavegacao from "@/componentes/navbar";
import Head from "@/componentes/head/head";
import HomePage from "./home/page";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import AuthProvider from "@/providersApp/AuthProvider";

export default function Home() {
  const { data: session } = useSession();

  const loading = () => {
    if (!session) return <>Loading</>;
  };
  useEffect(() => {
    loading();
  }, [session]);

  return (
    <AuthProvider>
      <HStack height={"100vh"}>
        <BarraNavegacao />
        <Flex flexDirection={"column"} height={"100vh"} width={"100vw"}>
          <Head text="Pagina Principal" buttonReturn={false} />

          <HomePage />
        </Flex>
      </HStack>
    </AuthProvider>
  );
}
