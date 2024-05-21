"use client";

import { Box, Button, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { createUser, loginUser } from "./action";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const toast = useToast();

  const logar = async () => {
    try {
      const user = await loginUser();
      
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
    <VStack>
      <Box>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>

        <FormControl>
          <FormLabel>Senha</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button onClick={() => logar()}>
          <Text>CRIAR USUARIO</Text>
        </Button>
      </Box>
    </VStack>
  );
};

export default Login;
