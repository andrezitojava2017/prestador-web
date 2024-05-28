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
import { FaUserEdit } from "react-icons/fa";
import ButtonService from "../buttons/buttonService";
import { AiFillSetting } from "react-icons/ai";
import { TbSettingsCode } from "react-icons/tb";

const ConfiguracaoIncluirTeto = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

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
                <Input type="number" />
                <FormHelperText>Limite de retenção de INSS</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Patronal ( % )</FormLabel>
                <Input type="number" />
                <FormHelperText>parte da empresa (11%)</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Competencia</FormLabel>
                <Input type="text" />
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
              onClick={() => console.log("Configuração")}
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
