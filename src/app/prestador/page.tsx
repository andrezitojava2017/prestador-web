"use client";

import Button from "@/componentes/buttons/button";
import Head from "@/componentes/head/head";
import { HStack, Stack } from "@chakra-ui/react";
import { FaUsersCog } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { BsClipboardDataFill } from "react-icons/bs";
import Information from "@/componentes/information/information";

const Prestador = () => {
  return (
    <Stack height={"100vh"}>
      <Head text="Prestador" />
      <HStack gap={8} marginLeft={6}>
        <Button
          action={() => console.log("Inserir novo prestador")}
          description="Novo Prestador"
          icon={<FaUsersCog size={50} color="white" />}
        />
        <Button
          action={() => console.log("Alterar informação de prestador")}
          description="Alterar inf. Prestador"
          icon={<BiSolidEdit size={50} color="white" />}
        />
        <Button
          description="Listar Prestador"
          icon={<BsClipboardDataFill size={50} color="white" />}
        />
      </HStack>
      <HStack
        marginLeft={6}
        alignItems={"end"}
        paddingBottom={4}
        height={"100vh"}
      >
        <Information
          value={"R$103.255,32"}
          information="Total empenhado a terceiros"
        />
        <Information
          value={"R$10.325,53"}
          information="Total retido segurado"
        />
        <Information value={"R$10.325,53"} information="Total patronal" />
      </HStack>
    </Stack>
  );
};

export default Prestador;
