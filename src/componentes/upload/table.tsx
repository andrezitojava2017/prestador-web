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
};
const TableOfServices = ({ data }: Props) => {
  return (
    <TableContainer overflowY={"auto"}>
      <Table variant="simple" size={"sm"}>
        <TableCaption>Lista de Terceiros</TableCaption>
        <Thead>
          <Tr>
            <Th>PIS/PASEP</Th>
            <Th>NOME PRESTADOR</Th>
            <Th>OPÇÕES</Th>
          </Tr>
        </Thead>
        <Tbody>
          
          {data.length !== 0 ? (
            data.map((el) => (
              <Tr key={el["pis-pasep"]}>
                <Td>{el["pis-pasep"]}</Td>
                <Td>{el.nome}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3} color={'red'}>Nenhum autonomo importado</Td>
            </Tr>
          )}
         
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={3} textAlign={'center'} fontSize={18}>Prestador Web</Th>
            
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default TableOfServices;
