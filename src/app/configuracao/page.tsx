"use client";
import CadastroSecretariaDrawer from "@/componentes/drawers/CadastroSecretariasDrawer";
import ConfiguracaoIncluirTeto from "@/componentes/drawers/ConfiguracaoIncluirTeto";
import Head from "@/componentes/head/head";
import BarraNavegacao from "@/componentes/navbar";
import TabelaCompetencia from "@/componentes/tabela/tabelaCompetencia";
import { TributoProvider } from "@/context/tributoContext";
import { Flex, HStack, Stack,  } from "@chakra-ui/react";

const Configuracao = () => {
  return (
    <HStack height={"100vh"}>
      <BarraNavegacao />
      <Flex flexDirection={"column"} height={"100vh"} width={"100vw"}>
        <Head text="Configuração" buttonReturn={true} />
        <HStack>
          {/**
           * Inclusao de provider neste ponto, pois ao chamar o componente de configuração
           * não será puxado os valores que foram setados na tela home
           * Este provider será outra intancia
           */}
          <TributoProvider>
            <ConfiguracaoIncluirTeto />
          </TributoProvider>

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
