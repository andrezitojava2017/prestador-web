"use client";
import { IPrestador } from "@/interface/IPrestador";
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
import {
  FreelanceProvider,
} from "@/context/FreelanceContext";
import LancarServicoDrawer from "../drawers/LancarServicoDrawer";
import { ReactNode } from "react";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

type Props = {
  data: IPrestador[];
  // eventos?: React.ReactNode;
};
const TableOfServices = ({ data }: Props) => {
  const pathname = usePathname();


  const drawerRegistroServico = (freelance: IPrestador, icone: ReactNode) => {
    return (
      <FreelanceProvider>
        <LancarServicoDrawer data={freelance} icone={icone} />
      </FreelanceProvider>
    );
  };

  /**
   * botoes de ação que será exibido em cada prestador da tabela
   * @param el
   * @returns
   */
  const eventos = (el: IPrestador) => {
    return (
      <FreelanceProvider>
        <HStack>
          <AlterarPrestadorDrawer data={el} />

          <Flex flexDirection={"column"} alignItems={"center"}>
            <Text fontSize={10}>Serviço</Text>
            {drawerRegistroServico(el, <BsTools size={18} color="green" />)}
          </Flex>
          {/*
          <Flex flexDirection={"column"} alignItems={"center"} onClick={() => console.log(el)}>
            <Text fontSize={10}>Serviço</Text>
            <BsTools size={18} color="green" />
          </Flex>
    */}
        </HStack>
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
          {data.length !== 0 &&
          data != null &&
          data != undefined ? (
            data.map((el: any, index: number) => (
              <Tr key={index}>
                <Td>{el.pispasep}</Td>
                <Td>{el.nome}</Td>
                {pathname === "/lista/prestador" ? ( // verifica a rota para definir as opções
                  <Td>{eventos(el)}</Td>
                ) : (
                  <td>
                    {drawerRegistroServico(
                      el,
                      <TbArrowBigRightLinesFilled size={18} color="blue" />
                    )}
                  </td>
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
