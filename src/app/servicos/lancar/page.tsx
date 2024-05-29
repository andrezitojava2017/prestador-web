'use client'
import FormularioServico from "@/componentes/formularioServico/FormularioServico";
import Head from "@/componentes/head/head";
import BarraNavegacao from "@/componentes/navbar";
import { FreelanceProvider } from "@/context/FreelanceContext";
import { Flex, HStack } from "@chakra-ui/react";

const NovoServico = () => {
  return (
    <FreelanceProvider>
      <HStack height={"100vh"}>
        <BarraNavegacao />
        <Flex flexDirection={"column"} height={"100vh"}>
          <Head text="Serviços" buttonReturn={true} />
          <FormularioServico />
        </Flex>
      </HStack>
    </FreelanceProvider>
  );
};

export default NovoServico;
