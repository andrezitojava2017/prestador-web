"use client";

import { Flex, HStack } from "@chakra-ui/react";
import BarraNavegacao from "@/componentes/navbar";
import Head from "@/componentes/head/head";
import HomePage from "./home/page";

export default function Home() {
  return (
    <HStack height={"100vh"}>
      <BarraNavegacao />
      <Flex flexDirection={'column'} height={'100vh'} width={'100vw'}>
        <Head text="Pagina Principal" buttonReturn={false} />
        <HomePage />
      </Flex>
    </HStack>
  );
}
