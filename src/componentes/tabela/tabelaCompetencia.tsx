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

const TabelaCompetencia = () => {
  return (
    <>
      <TableContainer>
        <Table variant="simple" size={'sm'}>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>COMPETENCIA</Th>
              <Th>MAX_REC</Th>
              <Th>BASE % RETIDO</Th>
              <Th>BASE % PATRONAL</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>05</Td>
              <Td>06/2024</Td>
              <Td>856,42</Td>
              <Td >11 %</Td>
              <Td >20 %</Td>

            </Tr>
            
          </Tbody>
         
        </Table>
      </TableContainer>
    </>
  );
};

export default TabelaCompetencia;