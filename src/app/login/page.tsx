"use client";

import { Box, Button, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { autenticarUsuario, verificarCampos } from "./action";
import { useRouter } from "next/navigation";
import { michroma } from "../fonts/fonts";
import { useState } from "react";
import { Credencial } from "@/interface/credencial";

const Login = () => {
  const router = useRouter();
  const toast = useToast();

  const [credencial, setCredencial] = useState<Credencial>({ email: "", senha: "" });

  const logar = async () => {
    try {
      // verifica se os campos estão preenchidos
      verificarCampos(credencial);

      // faz o login no supabase
      const user = await autenticarUsuario(credencial);

      // usuario logado redirecionamos para a home
      if (user) {
        router.refresh();
      }
    } catch (error: any) {
      toast({
        title: "Atenção",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      bgGradient="linear(to-r, #157A8C, #2BBFDA)"
    >
      <Box marginBottom={4}>
        <Text
          fontFamily={michroma.style.fontFamily}
          color={"#fff"}
          fontSize={24}
        >
          Prestador Web
        </Text>
      </Box>
      <VStack
        background={"#ffff"}
        padding={8}
        borderRadius={10}
        height={"50vh"}
        gap={2}
      >
        <FormControl>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            value={credencial?.email}
            onChange={(text) =>
              setCredencial({ ...credencial, email: text.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            value={credencial?.senha}
            onChange={(text) =>
              setCredencial({ ...credencial, senha: text.target.value })
            }
          />
        </FormControl>

        <Box marginTop={8} width={"100%"}>
          <Button
            onClick={() => logar()}
            width={"100%"}
            background={"#106B87"}
            _hover={{ background: "#1EA4BC" }}
          >
            <Text color={"#fff"}>Entrar</Text>
          </Button>
        </Box>
      </VStack>
      <Box>
        <Text color={"#fff"} fontSize={10}>
          <a href="https://wa.me/+5566981012229">
            Desenvolvido por: Jederson Andre
          </a>
        </Text>
      </Box>
    </VStack>
  );
};

export default Login;
