import Button from "@/componentes/buttons/button";
import Head from "@/componentes/head/head";
import { HStack, Stack, VStack } from "@chakra-ui/react";
import { VscNewFolder } from "react-icons/vsc";
import { MdViewKanban } from "react-icons/md";

const Servicos = () => {
  return (
    <Stack height={"100vh"} >
      <Head text="Serviços" />
      <HStack gap={8} marginLeft={6}>
        <Button
          description="Novo Serviço"
          icon={<VscNewFolder size={50} color="white" />}
        />
        <Button
          description="Listar serviços"
          icon={<MdViewKanban size={50} color="white" />}
        />
        
      </HStack>

    </Stack>
  );
};

export default Servicos;