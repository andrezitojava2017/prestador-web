"use client";
import { Freelance } from "@/interface/freelance";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  HStack,
  Flex,
} from "@chakra-ui/react";
import AlterarPrestadorDrawer from "../drawers/AlterarPrestadorDrawer";
import { BsTools } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { FreelanceProvider } from "@/context/FreelanceContext";
import LancarServicoDrawer from "../drawers/LancarServicoDrawer";

type Props = {
  data: Freelance[];
  // eventos?: React.ReactNode;
};
const TableOfServices = ({ data }: Props) => {
  const pathname = usePathname();

  /**
   * botoes de ação que será exibido em cada prestador da tabela
   * @param el
   * @returns
   */
  const eventos = (el: Freelance) => {
    return (
      <FreelanceProvider>
      <HStack>
        <AlterarPrestadorDrawer data={el} />
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Text fontSize={10}>Serviço</Text>
          <BsTools size={18} color="green" />
        </Flex>
      </HStack>
      </FreelanceProvider>
    );
  };

  const drawerRegistroServico = (freelance: Freelance) => {
    return (
      <FreelanceProvider>
        <LancarServicoDrawer data={freelance} />
      </FreelanceProvider>
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
                  <td>{drawerRegistroServico(el)}</td>
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
