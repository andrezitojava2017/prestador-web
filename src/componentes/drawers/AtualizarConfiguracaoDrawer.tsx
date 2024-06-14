"use client";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  useDisclosure,
  Button,
  useToast,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { TbSettingsCode } from "react-icons/tb";
import { validarDadosConfiguracaoTributo } from "./action";
import { inserirConfigTributo } from "@/service/tributoService";
import { TributoContext } from "@/context/tributoContext";
import FormularioConfigTeto from "../formularioConfigTeto/FormularioConfigTeto";
import { BiMessageSquareEdit } from "react-icons/bi";

const AtualizarConfiguracaoDrawer = () => {
  const { tributoRef, setTributoRef } = useContext(TributoContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  /*
  const [tributo, setTributo] = useState<ITributos>({
    competencia: "",
    max_recolhimento: 0,
    base_patronal: 0,
    base_segurado: 0,
  });
  const [errorCompetencia, setErrorCompetencia] = useState<boolean>(true);
*/
  const toast = useToast();

  /**
   * validação com padrao regex: MM/yyyy
   * @param e string
   
  const validarCampoObrigatorioCompetencia = (e: string) => {
    setErrorCompetencia((prev) => !validarCompetencia(e));
    if (errorCompetencia) setTributo({ ...tributo, competencia: e });
  };
*/
  const salvarConfiguracaoTributo = async () => {
    setLoading(true);
    try {
      // valida os campos preenchidos
      validarDadosConfiguracaoTributo(tributoRef);

      // verifica se ha erro em algum campo
      /*
      if (errorCompetencia)
        throw new Error("Preencha a competencia com valor aceito: ex: 01/2000");
*/
      await inserirConfigTributo(tributoRef);
      setLoading(false);

      // mensagem de aviso
      toast({
        title: "Parabéns!",
        description: "Dados registrados com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Tivemos um problema",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box
        alignItems={"center"}
        onClick={() => onOpen()}
        _hover={{ cursor: "pointer" }}
      >
        <BiMessageSquareEdit size={24} color="green" />
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <TbSettingsCode size={40} color="#106B87" />
              <Text color={"#106B87"}>Atualizar Configuração</Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <FormularioConfigTeto />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              isLoading={loading}
              loadingText={"Aguarde..."}
              //onClick={() => salvarConfiguracaoTributo()}
              onClick={() => console.log(tributoRef)}
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AtualizarConfiguracaoDrawer;
