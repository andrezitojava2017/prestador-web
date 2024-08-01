"use client";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import icone from "../icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Credencial } from "@/interface/credencial";
import { novoUsuario } from "@/service/loginService";
import { warn } from "console";

const Cadastro = () => {
  const toast = useToast();
  const router = useRouter();
  const [user, setUser] = useState<Credencial>({
    email: "",
    nome: "",
    senha: "",
    avatar: "",
  });

  const adicionaNovoUsuario = async () => {
    try {
      await novoUsuario(user);

      // mensagem de aviso
      toast({
        title: "Parabéns!",
        description: "Dados registrados com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.warn(error);
      
      toast({
        title: "Error",
        description: "Erro no cadastro de usuario",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
        <Input
          type="text"
          placeholder="Nome do usuario"
          onChange={(e) => setUser({ ...user, nome: e.currentTarget.value })}
          value={user.nome}
        />
        <Input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}
          value={user.email}
        />
        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => setUser({ ...user, senha: e.currentTarget.value })}
          value={user.senha}
        />
      </Box>
      <Flex flexDir={"column"} gap={8}>
        <Button colorScheme="blue" onClick={adicionaNovoUsuario}>
          Criar usuario
        </Button>
        <Text
          onClick={() => router.push("/")}
          textAlign={"center"}
          _hover={{
            cursor: "pointer",
            border: "1px solid black",
            borderRadius: 20,
          }}
        >
          Voltar
        </Text>
      </Flex>
    </Flex>
  );
};

export default Cadastro;
