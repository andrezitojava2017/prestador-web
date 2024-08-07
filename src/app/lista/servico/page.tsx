"use client";
import Head from "@/componentes/head/head";
import BarraNavegacao from "@/componentes/navbar";
import Pesquisa from "@/componentes/pesquisa/pesquisa";
import TabelaServiços from "@/componentes/tabela/tabelaServicos";
import { IServico } from "@/interface/IServico";
import { buscarServico, relatorioResumoGuia } from "@/service/servicosService";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { IMessage } from "@/interface/IMessage";
import { validarCompetencia } from "@/utils/configuracao/actions";
import { TributoContext } from "@/context/tributoContext";
import { pdf } from "@react-pdf/renderer";
import MyDocument from "@/relatorios/fonte";
import ResumoGuias from "@/relatorios/resumo";

type Resumo = {
  cod_lotacao: string;
  descricao: string;
  competencia: string;
  fonte: string;
  patronal: number;
  retido: number;
  total_guia: number;
};


const ListarServicos = () => {

  const [dadosPesquisa, setDadosPesquisa] = useState<{
    competencia: string | any;
    prestador: string;
  }>({ competencia: "", prestador: "" });
  const [listaServico, setListaServico] = useState<IServico[]>([]);
  const [message, setMessage] = useState<IMessage>();
  const toast = useToast();
  const { tributoRef } = useContext(TributoContext)
  const [enable, setEnable] = useState<boolean>(true);
  const [resumoGuia, setResumoGuia] = useState<Resumo[]>([]);

  useEffect(() => {
    if (message) {
      toast({
        title: message.title,
        description: message.message,
        status: message.type,
      });
    }
  }, [message]);

  useEffect(() => {
    setDadosPesquisa({ ...dadosPesquisa, competencia: tributoRef.competencia })
  }, [])

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
      const rsGuias = await relatorioResumoGuia(dadosPesquisa.competencia);
  
      if (result && rsGuias) {
        setListaServico(result);
        setResumoGuia(rsGuias);
        setEnable(false)

      }
    } catch (error: any) {
      setMessage({
        title: "Error",
        message: `${error.message}`,
        type: "error",
      });
    }
  };

  const handlePrint = async () => {
    // Gera o blob do PDF
    const blob = await pdf(<MyDocument data={listaServico} />).toBlob();
    // Cria uma URL para o blob e abre em uma nova aba
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url);
    // Espera a nova janela carregar e chama a função de impressão

  };

  const printResumGuias = async () => {
    // Gera o blob do PDF
    const blob = await pdf(<ResumoGuias data={resumoGuia} />).toBlob();
    // Cria uma URL para o blob e abre em uma nova aba
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url);
    // Espera a nova janela carregar e chama a função de impressão
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

        <Box display={'flex'} flex={'row'} paddingLeft={8} paddingBottom={10} gap={8}>
          <Button colorScheme="cyan" onClick={handlePrint} isDisabled={enable}>
            PDF por Fonte
          </Button>
          <Button colorScheme="cyan" onClick={printResumGuias} isDisabled={enable}>
            PDF Resumo Guias
          </Button>


        </Box>
      </Flex>

    </HStack>
  );
};

export default ListarServicos;
