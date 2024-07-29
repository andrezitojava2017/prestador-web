"use client";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import icone from "../icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cadastro = () => {
  const router = useRouter();
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      gap={4}
    >
      <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
        <Image src={icone} alt="Prestador Web" width={80} height={80} />
        <Text fontSize={"2xl"} paddingBottom={8}>
          Cadastro de usuarios
        </Text>
      </Box>

      <Box display={"flex"} flexDirection={"column"} width={"40%"} gap={"4"}>
        <Input type="text" placeholder="Nome do usuario" />
        <Input type="email" placeholder="E-mail" />
        <Input type="password" placeholder="Senha" />
      </Box>
      <Flex flexDir={"column"} gap={8}>
        <Button colorScheme="blue">Criar usuario</Button>
        <Text onClick={() => router.push("/")} textAlign={'center'} _hover={{cursor:'pointer', border:'1px solid black', borderRadius:20}}>Voltar</Text>
      </Flex>
    </Flex>
  );
};

export default Cadastro;
