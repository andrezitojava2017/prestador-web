"use client";

import Option from "@/componentes/buttons/button";
import Head from "@/componentes/head/head";
import { Flex, HStack, Stack, useDisclosure } from "@chakra-ui/react";
import { FaUsersCog } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { BsClipboardDataFill } from "react-icons/bs";
import Information from "@/componentes/information/information";
import BarraNavegacao from "@/componentes/navbar";
import ModalContentNewProvider from "@/componentes/modals/modalContentNovoPrestador";
import ButtonService from "@/componentes/buttons/buttonService";
import Link from "next/link";

const Prestador = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack height={"100vh"}>
      <BarraNavegacao />
      <Flex flexDirection={"column"} height={"100vh"}>
        <Head text="Prestador" buttonReturn={true} />
        <HStack gap={8} marginLeft={6}>
          <Option
            // action={isOpen()}
            description="Novo Prestador"
            icon={<FaUsersCog size={50} color="white" />}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            modalContentProvider={<ModalContentNewProvider close={onClose} />}
          />
          <Link href={'/lista/prestador'}>
            <ButtonService
              description="Listar Prestador"
              icon={<BsClipboardDataFill size={50} color="white" />}
            />
          </Link>
          {/* 
          <Option
            // action={() => console.log("Alterar informação de prestador")}
            description="Alterar inf. Prestador"
            icon={<BiSolidEdit size={50} color="white" />}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
          <Option
            description="Listar Prestador"
            icon={<BsClipboardDataFill size={50} color="white" />}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
  */}
        </HStack>

      </Flex>
    </HStack>
  );
};

export default Prestador;
