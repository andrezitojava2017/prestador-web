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
} from "@chakra-ui/react";
import { useState } from "react";
import ButtonService from "../buttons/buttonService";
import { TbSettingsCode } from "react-icons/tb";
import { validarDadosSecretaria } from "./action";
import { ISecretaria } from "@/interface/ISecretaria";
import { FiEdit } from "react-icons/fi";
import { adicionarNovaSecretaria } from "@/service/secretariaService";

const CadastroSecretariaDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const [secretaria, setSecretaria] = useState<ISecretaria>({
    codigo: 0,
    descricao: "",
  });

  const toast = useToast();

  const adicionarSecretaria = async () => {
    setLoading(true);

    try {
      validarDadosSecretaria(secretaria);
      await adicionarNovaSecretaria(secretaria);

      // mensagem de aviso
      toast({
        title: "Parabéns!",
        description: "Dados registrados com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      // mensagem de aviso
      toast({
        title: "Tivemos um problema!",
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
          description="Secretarias"
          icon={<FiEdit size={50} color="white" />}
        />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <TbSettingsCode size={40} color="#106B87" />
              <Text color={"#106B87"}>Inserir Secretaria</Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack gap={4}>
              <FormControl>
                <FormLabel>Codigo</FormLabel>
                <Input
                  type="number"
                  value={secretaria?.codigo}
                  onChange={(e) =>
                    setSecretaria({
                      ...secretaria,
                      codigo: parseFloat(e.target.value),
                    })
                  }
                />
                <FormHelperText>Ex: 201, 301, 431</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input
                  type="text"
                  value={secretaria.descricao}
                  onChange={(e) =>
                    setSecretaria({
                      ...secretaria,
                      descricao: e.target.value,
                    })
                  }
                />
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
              onClick={() => adicionarSecretaria()}
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CadastroSecretariaDrawer;
