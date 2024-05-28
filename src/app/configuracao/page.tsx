
import ConfiguracaoIncluirTeto from "@/componentes/drawers/ConfiguracaoIncluirTeto";
import Head from "@/componentes/head/head";
import BarraNavegacao from "@/componentes/navbar";
import { Box, Flex, HStack } from "@chakra-ui/react";

const Configuracao = () => {
  return (
    <HStack height={"100vh"} >
      <BarraNavegacao />
      <Flex flexDirection={"column"} height={"100vh"}>
        <Head text="Configuração" buttonReturn={true} />

        <Box>
          <ConfiguracaoIncluirTeto />
        </Box>
      </Flex>
    </HStack>
  );
};

export default Configuracao;
