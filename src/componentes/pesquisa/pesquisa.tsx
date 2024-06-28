import { Dispatch, ReactNode, SetStateAction } from "react";
import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";

type Pesquisa = {
  setState: Dispatch<
    SetStateAction<{ competencia: string; prestador: string }>
  >;
  dadosPesquisa: { competencia: string; prestador: string };
  btnBuscar?: ReactNode;
  ativaCompetencia: boolean;
  ativaPrestador?: boolean;
};

const Pesquisa = (props: Pesquisa) => {
  return (
    <HStack>
      <Flex
        flexDirection={"row"}
        alignItems={"baseline"}
        gap={8}
        border={"1px solid #106B87"}
        borderRadius={8}
        padding={4}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"baseline"}
          gap={2}
        >
          <Text>Competencia</Text>
          <Input
          placeholder="08/2021"
            isDisabled={!props.ativaCompetencia}
            type="text"
            width={"18vw"}
            value={props.dadosPesquisa.competencia}
            onChange={(text) =>
              props.setState({
                ...props.dadosPesquisa,
                competencia: text.target.value,
              })
            }
          />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"baseline"}
          gap={2}
        >
          <Text>Prestador</Text>
          <Input
            isDisabled={false || props.ativaPrestador}
            type="text"
            width={"28vw"}
            value={props.dadosPesquisa.prestador}
            onChange={(text) =>
              props.setState({
                ...props.dadosPesquisa,
                prestador: text.target.value,
              })
            }
          />
        </Box>
        <Box>{props.btnBuscar}</Box>
      </Flex>
    </HStack>
  );
};
export default Pesquisa;
