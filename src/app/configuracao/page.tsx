import CadastroSecretariaDrawer from "@/componentes/drawers/CadastroSecretariasDrawer";
import ConfiguracaoIncluirTeto from "@/componentes/drawers/ConfiguracaoIncluirTeto";
import Head from "@/componentes/head/head";
import BarraNavegacao from "@/componentes/navbar";
import TabelaCompetencia from "@/componentes/tabela/tabelaCompetencia";
import { Flex, HStack, Stack } from "@chakra-ui/react";

const Configuracao = () => {
  return (
    <HStack height={"100vh"}>
      <BarraNavegacao />
      <Flex flexDirection={"column"} height={"100vh"} width={"100vw"}>
        <Head text="Configuração" buttonReturn={true} />
        <HStack>
          <ConfiguracaoIncluirTeto />
          <CadastroSecretariaDrawer />
        </HStack>

        <Stack padding={8}>
          <TabelaCompetencia />
        </Stack>
      </Flex>
    </HStack>
  );
};

export default Configuracao;
