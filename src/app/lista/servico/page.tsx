"use client";
import Head from "@/componentes/head/head";
import BarraNavegacao from "@/componentes/navbar";
import Pesquisa from "@/componentes/pesquisa/pesquisa";
import TabelaServiços from "@/componentes/tabela/tabelaServicos";
import { IServico } from "@/interface/IServico";
import { buscarServico } from "@/service/servicosService";
import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const ListarServicos = () => {
  const [dadosPesquisa, setDadosPesquisa] = useState<{
    competencia: string;
    prestador: string;
  }>({ competencia: "", prestador: "" });
  const [listaServico, setListaServico] = useState<IServico[]>([]);

  const consulta = async ()=>{
    const result = await buscarServico('03/2022')
    if(result){
      setListaServico(result)
    }

  }

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
            ativaPrestador={true}
            btnBuscar={
              <Button onClick={consulta}>
                Buscar
              </Button>
            }
          />
        </HStack>
        <TabelaServiços data={listaServico}/>
      </Flex>
    </HStack>
  );
};

export default ListarServicos;
