"use client";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import AtualizarConfiguracaoDrawer from "../drawers/AtualizarConfiguracaoDrawer";
import { IServico } from "@/interface/IServico";

type Props = {
  data: IServico[];
};

const TabelaServiços = ({ data }: Props) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>COMPETENCIA</Th>
              <Th>PIS/PASESP</Th>
              <Th>INSS RETIDO</Th>
              <Th>OPÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length !== 0 ? (
              data.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td>{item.competencia}</Td>
                    <Td>{item.db_pessoas?.nome}</Td>
                    <Td>{item.inss_retido}</Td>
                    <Td>oupções</Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={3} color={"red"} textAlign={"center"} padding={6}>
                  Nenhuma informação
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TabelaServiços;
