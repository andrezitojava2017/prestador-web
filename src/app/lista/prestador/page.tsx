"use client";

import Head from "@/componentes/head/head";
import BarraNavegacao from "@/componentes/navbar";
import Pesquisa from "@/componentes/pesquisa/pesquisa";
import TableOfServices from "@/componentes/tabela/table";
import { Freelance } from "@/interface/freelance";
import { buscarPrestador } from "@/service/prestadorService";
import {
  Button,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsTools } from "react-icons/bs";
import AlterarPrestadorDrawer from "@/componentes/drawers/AlterarPrestadorDrawer";

const ListarPrestador = () => {
  const [dadosPesquisa, setDadosPesquisa] = useState<{
    competencia: string;
    prestador: string;
  }>({ competencia: "", prestador: "" });

  const [listaPrestador, setListaPrestador] = useState<Freelance[]>([]);

  const consultar = async () => {
    const resultado = await buscarPrestador(dadosPesquisa.prestador);
    if (resultado) {
      setListaPrestador(resultado);
    }
  };


  return (
    <HStack height={"100vh"}>
      <BarraNavegacao />
      <Flex flexDirection={"column"} height={"100vh"}>
        <Head text="Listar Prestador" buttonReturn={true} />
        <VStack marginLeft={6} marginBottom={8}>
          <Pesquisa
            setState={setDadosPesquisa}
            dadosPesquisa={dadosPesquisa}
            ativaCompetencia={false}
            btnBuscar={
              <Button onClick={() => consultar()} size={"sm"}>
                <Text>BUSCAR</Text>
              </Button>
            }
          />
        </VStack>
     
          <TableOfServices data={listaPrestador!} />
       
      </Flex>
    </HStack>
  );
};

export default ListarPrestador;
