"use client"
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
} from "@chakra-ui/react";

type Props = {
  data: Freelance[];
  eventos?:React.ReactNode
};
const TableOfServices = ({ data, eventos }: Props) => {
  return (
    <TableContainer overflowY={"auto"}>
      <Table variant="simple"  >
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
                <Td >{el.pisPasep}</Td>
                <Td >{el.nome}</Td>
                <Td >{eventos}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3} color={'red'} textAlign={'center'} padding={6}>Nenhum autonomo importado</Td>
            </Tr>
          )}
         
        </Tbody>
 
      </Table>
    </TableContainer>
  );
};

export default TableOfServices;
