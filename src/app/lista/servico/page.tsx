"use client";
import Head from "@/componentes/head/head";
import BarraNavegacao from "@/componentes/navbar";
import Pesquisa from "@/componentes/pesquisa/pesquisa";
import TabelaServiços from "@/componentes/tabela/tabelaServicos";
import { IServico } from "@/interface/IServico";
import { buscarServico } from "@/service/servicosService";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { IMessage } from "@/interface/IMessage";
import { validarCompetencia } from "@/utils/configuracao/actions";
import { TributoContext } from "@/context/tributoContext";

const ListarServicos = () => {
  const [dadosPesquisa, setDadosPesquisa] = useState<{
    competencia: string | any;
    prestador: string;
  }>({ competencia: "", prestador: "" });
  const [listaServico, setListaServico] = useState<IServico[]>([]);
  const [message, setMessage] = useState<IMessage>();
  const toast = useToast();
  const {tributoRef} = useContext(TributoContext)

  useEffect(() => {
    if (message) {
      toast({
        title: message.title,
        description: message.message,
        status: message.type,
      });
    }
  }, [message]);

  useEffect(()=>{
    setDadosPesquisa({...dadosPesquisa, competencia: tributoRef.competencia})
  },[])

  const consulta = async () => {
    try {
      if (!validarCompetencia(dadosPesquisa.competencia)) {
        setMessage({
          title: "Atenção",
          message: "Preencha o campo competencia corretamente",
          type: "warning",
        });
        return;
      }

      // faz a busca de serviços em determinada competencia e exibe na tabela
      const result = await buscarServico(dadosPesquisa.competencia);
      if (result) {
        setListaServico(result);
      }
    } catch (error: any) {
      setMessage({
        title: "Error",
        message: `${error.message}`,
        type: "error",
      });
    }
  };

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
            btnBuscar={<Button onClick={consulta}>Buscar</Button>}
          />
        </HStack>
        <TabelaServiços data={listaServico} />
      </Flex>
    </HStack>
  );
};

export default ListarServicos;
