"use client";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { IServico } from "@/interface/IServico";
import LancarServicoDrawer from "../drawers/LancarServicoDrawer";
import { MdEditSquare } from "react-icons/md";
import { IPrestador } from "@/interface/IPrestador";

type Props = {
  data: IServico[];
};

const TabelaServiços = ({ data }: Props) => {
  return (
    <>
      <TableContainer margin={8} overflowY={"auto"}>
        <Table variant="striped" size={"sm"} colorScheme="blackAlpha">
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
                    <Td fontWeight={"700"}>{item.competencia}</Td>
                    <Td>{item.db_pessoas?.nome}</Td>
                    <Td color={"red"}>
                      {item.inss_retido.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Td>
                    <Td>
                      {
                        <LancarServicoDrawer
                          icone={<MdEditSquare size={30} color={"red"} />}
                          data={item.db_pessoas as IPrestador}
                        />
                      }
                    </Td>
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
