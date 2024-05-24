"use client";
import { Freelance } from "@/interface/freelance";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import AlterarPrestadorDrawer from "../drawers/AlterarPrestadorDrawer";
import { BsTools } from "react-icons/bs";
import { usePathname } from "next/navigation";

type Props = {
  data: Freelance[];
  // eventos?: React.ReactNode;
};
const TableOfServices = ({ data }: Props) => {
  const pathname = usePathname();

  const eventos = (el: Freelance) => {
    return (
      <HStack>
        <AlterarPrestadorDrawer data={el} />

        <Flex flexDirection={"column"} alignItems={"center"}>
          <Text fontSize={10}>Serviço</Text>
          <BsTools size={18} color="green" />
        </Flex>
      </HStack>
    );
  };

  return (
    <TableContainer overflowY={"auto"}>
      <Table variant="simple">
        <TableCaption>Lista de Terceiros</TableCaption>
        <Thead>
          <Tr>
            <Th>PIS/PASEP</Th>
            <Th>NOME PRESTADOR</Th>
            <Th>OPÇÕES</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length !== 0 && data != null && data != undefined ? (
            data.map((el, index) => (
              <Tr key={index}>
                <Td>{el.pisPasep}</Td>
                <Td>{el.nome}</Td>
                {pathname === "/lista/prestador" ? (
                  <Td>{eventos(el)}</Td>
                ) : (
                  <td>texto</td>
                )}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3} color={"red"} textAlign={"center"} padding={6}>
                Nenhum autonomo importado
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableOfServices;
