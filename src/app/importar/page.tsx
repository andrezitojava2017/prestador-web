"use client";

import Head from "@/componentes/head/head";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  readLinesOfFile,
  saveLocalStorage,
} from "./actions";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import BarraNavegacao from "@/componentes/navbar";
import TableOfServices from "@/componentes/tabela/table";
import { FreelanceContexts, FreelanceProvider } from "@/context/FreelanceContext";
import { getFreelanceStorage } from "@/utils/storage/storage";

const ImportFile = () => {
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const {freelanceStorage, setFreelanceStorage} = useContext(FreelanceContexts)
  const toast = useToast();

  /**
   * faz a leitura do arquivo selecionado, retornando um array de objetos com a estrutura definida
   * na interface Freelance;
   * seta no state freelanceList para exibir na pagina;
   * salva no localstorage os dados de terceiros;
   * ativa o botao limpar historico;
   * @param file - arquivo que foi selecionado
   */
  const readFileFreelance = async (file: ChangeEvent<HTMLInputElement>) => {
    const list = await readLinesOfFile(file);
    setFreelanceStorage(list);
    saveLocalStorage(list);
    setButtonDisable(!buttonDisable);
  };

  /**
   * limpa os dados da localstorage, com dados que foram inseridos
   * desativa o botão de limpar historico
   * limpa a lista de autonomos, consequentemente a tabela
   */
  const clearHistory = () => {
    if (localStorage.getItem("freelance") !== null) {
      localStorage.removeItem("freelance");
      setButtonDisable(!buttonDisable);
      setFreelanceStorage([]);
    }
  };

  /**
   * executa ao carregar a pagina, verificando se há alguma informação no localstorage
   * caso houver, ele recupera os dados para serem
   * exibidos na tabela da pagina
   */
  useEffect(() => {
    try {
      let free = getFreelanceStorage();
      if (free.length !== 0) {
        setFreelanceStorage(free);
        setButtonDisable(!buttonDisable);
      }
    } catch (error) {
      toast({
        title: "Tivemos um problema",
        description: "Ocorreu um erro interno na aplicação",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, []);


  const atualizaTabela = ()=>{
    let free = getFreelanceStorage();
      if (free.length !== 0) {
        setFreelanceStorage(free);
        //setButtonDisable(!buttonDisable);
      }
  }

  return (
    <HStack height={"100vh"}>
      <BarraNavegacao />
      <Flex flexDirection={"column"} width={"100vw"} height={"100vh"}>
        <Head text="Importar arquivo .RE" buttonReturn={true} />

        <Stack
          marginLeft={6}
          width={"40%"}
          border={"1px solid #106B87"}
          borderRadius={8}
          padding={4}
        >
          <FormControl>
            <FormLabel>Importar arquivo</FormLabel>
            <Input
              type="file"
              accept=".re"
              onChange={(file) => readFileFreelance(file)}
            />
            <FormHelperText>Arquivo com extensao .RE</FormHelperText>
          </FormControl>
          // caso existir dados no localstorage, o btn ficara disponivel para
          limpar os dados
          <Button isDisabled={buttonDisable} onClick={() => clearHistory()}>
            <Text>Limpar historico</Text>
          </Button>

          <Button isDisabled={buttonDisable} onClick={atualizaTabela}>
            <Text>Atualizar lista</Text>
          </Button>
        </Stack>

        <Stack maxHeight={"50vh"} marginTop={8}>
         
            <TableOfServices data={freelanceStorage} />
          
        </Stack>
      </Flex>
    </HStack>
  );
};

export default ImportFile;
