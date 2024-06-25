"use client";
import Head from "@/componentes/head/head";
import BarraNavegacao from "@/componentes/navbar";
import Pesquisa from "@/componentes/pesquisa/pesquisa";
import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const ListarServicos = () => {
  const [dadosPesquisa, setDadosPesquisa] = useState<{
    competencia: string;
    prestador: string;
  }>({ competencia: "", prestador: "" });

  return (
    <HStack height={"100vh"}>
      <BarraNavegacao />
      <Flex flexDirection={"column"} height={"100vh"} width={"100vw"}>
        <Head text="Serviços" buttonReturn={true} />
        <HStack gap={8} marginLeft={6}>
          <Pesquisa
            setState={setDadosPesquisa}
            dadosPesquisa={dadosPesquisa}
            ativaCompetencia={true}
            btnBuscar={
              <Button onClick={() => console.log(dadosPesquisa)}>
                Buscar
              </Button>
            }
          />
        </HStack>
      </Flex>
    </HStack>
  );
};

export default ListarServicos;
