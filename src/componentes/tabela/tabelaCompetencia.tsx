"use client";

import { TributoContext } from "@/context/tributoContext";
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
import { useContext } from "react";
import AtualizarConfiguracaoDrawer from "../drawers/AtualizarConfiguracaoDrawer";

const TabelaCompetencia = () => {
  const { tributoRef } = useContext(TributoContext);

  return (
    <>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>COMPETENCIA</Th>
              <Th>MAX_REC</Th>
              <Th>BASE % RETIDO</Th>
              <Th>BASE % PATRONAL</Th>
              <Th>OPÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{tributoRef.competencia}</Td>
              <Td>{tributoRef.max_recolhimento}</Td>
              <Td>{tributoRef.base_segurado}</Td>
              <Td>{tributoRef.base_patronal}</Td>
              <Td>{<AtualizarConfiguracaoDrawer />}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TabelaCompetencia;
