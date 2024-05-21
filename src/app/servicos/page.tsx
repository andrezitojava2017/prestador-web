import Option from "@/componentes/buttons/button";
import Head from "@/componentes/head/head";
import { Flex, HStack } from "@chakra-ui/react";
import { VscNewFolder } from "react-icons/vsc";
import { MdViewKanban } from "react-icons/md";
import BarraNavegacao from "@/componentes/navbar";

const Servicos = () => {
  return (
    <HStack height={"100vh"}>
      <BarraNavegacao />
      <Flex flexDirection={'column'} height={'100vh'} >
      <Head text="Serviços" buttonReturn={true} />
      <HStack gap={8} marginLeft={6}>
        <Option
          description="Novo Serviço"
          icon={<VscNewFolder size={50} color="white" />}
          
        />
        <Option
          description="Listar serviços"
          icon={<MdViewKanban size={50} color="white" />}
        />
      </HStack>
      </Flex>
    </HStack>
  );
};

export default Servicos;
