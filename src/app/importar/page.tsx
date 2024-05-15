"use client";

import Head from "@/componentes/head/head";
import TableOfServices from "@/componentes/upload/table";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  getFreelanceStorage,
  readLinesOfFile,
  saveLocalStorage,
} from "./actions";
import { ChangeEvent, useEffect, useState } from "react";
import { Freelance } from "../../interface/freelance";

const ImportFile = () => {
  const [freelanceList, setFreelanceList] = useState<Freelance[]>([]);
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
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
    setFreelanceList(list);
    saveLocalStorage(list);
    setButtonDisable(!buttonDisable)
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
      setFreelanceList([])
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
        setFreelanceList(free);
        setButtonDisable(!buttonDisable)
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

  return (
    <Stack height={"100vh"}>
      <Head text="Importar arquivo .RE" />

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
       
          <Button isDisabled={buttonDisable} onClick={() => clearHistory()} >
            <Text>Limpar historico</Text>
          </Button>
       
      </Stack>

      <Stack maxHeight={"50vh"} marginTop={8}>
        <TableOfServices data={freelanceList} />
      </Stack>
    </Stack>
  );
};

export default ImportFile;
