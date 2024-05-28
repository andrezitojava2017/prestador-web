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
  VStack,
  FormControl,
  Input,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import ButtonService from "../buttons/buttonService";
import { AiFillSetting } from "react-icons/ai";
import { TbSettingsCode } from "react-icons/tb";
import { ITributos } from "@/interface/ITributos";
import { validarCompetencia } from "@/utils/configuracao/actions";
import { validarDadosConfiguracaoTributo } from "./action";
import { inserirConfigTributo } from "@/service/tributoService";

const ConfiguracaoIncluirTeto = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const [tributo, setTributo] = useState<ITributos>({
    competencia: "",
    max_recolhimento: 0,
    patronal: 0,
  });
  const [errorCompetencia, setErrorCompetencia] = useState<boolean>(true);

  const toast = useToast();

  /**
   * validação com padrao regex: MM/yyyy
   * @param e string
   */
  const validarCampoObrigatorioCompetencia = (e: string) => {
    setErrorCompetencia((prev) => !validarCompetencia(e));
    if (errorCompetencia) setTributo({ ...tributo, competencia: e });
  };

  const salvarConfiguracaoTributo = async () => {
    setLoading(true)
    try {

      // valida os campos preenchidos
      validarDadosConfiguracaoTributo(tributo);

      // verifica se ha erro em algum campo
      if(errorCompetencia) throw new Error('Preencha a competencia com valor aceito: ex: 01/2000')

      await inserirConfigTributo(tributo);
      setLoading(false)

      // mensagem de aviso
      toast({
        title: "Parabéns!",
        description: "Dados registrados com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
    } catch (error: any) {
      setLoading(false)
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
            <VStack gap={4}>
              <FormControl>
                <FormLabel>Maximo a recolher</FormLabel>
                <Input
                  type="number"
                  value={tributo?.max_recolhimento}
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
                  value={tributo.patronal}
                  onChange={(e) =>
                    setTributo({
                      ...tributo,
                      patronal: parseFloat(e.target.value),
                    })
                  }
                />
                <FormHelperText>parte da empresa (11%)</FormHelperText>
              </FormControl>

              <FormControl isInvalid={errorCompetencia}>
                <FormLabel>Competencia</FormLabel>
                <Input
                  type="text"
                  value={tributo?.competencia}
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
