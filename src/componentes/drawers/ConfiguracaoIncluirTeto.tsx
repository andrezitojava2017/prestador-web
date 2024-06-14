"use client";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  useDisclosure,
  Button,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import ButtonService from "../buttons/buttonService";
import { AiFillSetting } from "react-icons/ai";
import { TbSettingsCode } from "react-icons/tb";
import { validarDadosConfiguracaoTributo } from "./action";
import { inserirConfigTributo } from "@/service/tributoService";
import { TributoContext } from "@/context/tributoContext";
import FormularioConfigTeto from "../formularioConfigTeto/FormularioConfigTeto";



const ConfiguracaoIncluirTeto = () => {
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
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        onClick={() => onOpen()}
        _hover={{ cursor: "pointer" }}
      >
        <ButtonService
          description="Definir Teto"
          icon={<AiFillSetting size={50} color="white" />}
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <TbSettingsCode size={40} color="#106B87" />
              <Text color={"#106B87"}>Definir Teto de INSS</Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
              <FormularioConfigTeto />
            {/* 
            <VStack gap={4}>
              <FormControl>
                <FormLabel>Maximo a recolher</FormLabel>
                <Input
                  type="number"
                  value={tributoRef?.max_recolhimento}
                  onChange={(e) =>
                    setTributo({
                      ...tributo,
                      max_recolhimento: parseFloat(e.target.value),
                    })
                  }
                />
                <FormHelperText>Limite de retenção de INSS</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Patronal ( % )</FormLabel>
                <Input
                  type="number"
                  value={tributoRef.base_patronal}
                  onChange={(e) =>
                    setTributo({
                      ...tributo,
                      base_patronal: parseFloat(e.target.value),
                    })
                  }
                />
                <FormHelperText>parte da empresa (20%)</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Segurado ( % )</FormLabel>
                <Input
                  type="number"
                  value={tributoRef.base_segurado}
                  onChange={(e) =>
                    setTributo({
                      ...tributo,
                      base_segurado: parseFloat(e.target.value),
                    })
                  }
                />
                <FormHelperText>parte da segurado (11%)</FormHelperText>
              </FormControl>

              <FormControl isInvalid={errorCompetencia}>
                <FormLabel>Competencia</FormLabel>
                <Input
                  type="text"
                  value={tributoRef?.competencia}
                  onChange={(e) => {
                    validarCampoObrigatorioCompetencia(e.target.value);
                  }}
                />
                {!errorCompetencia ? (
                  <FormHelperText color={"green"}>
                    Competencia valida
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Competencia inválida</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
            */}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              isLoading={loading}
              loadingText={"Aguarde..."}
              onClick={() => salvarConfiguracaoTributo()}
              //onClick={() => console.log(tributoRef)}
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ConfiguracaoIncluirTeto;
