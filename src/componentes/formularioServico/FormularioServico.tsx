"use client";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Select,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import Information from "../information/information";
import { useContext, useEffect, useState } from "react";
import { FreelanceContexts } from "@/context/FreelanceContext";
import { IServico } from "@/interface/IServico";
import { usePathname } from "next/navigation";
import useSecretaria from "@/hook/useSecretarias";
import { TributoContext } from "@/context/tributoContext";

const FormularioServico = () => {
  const { setFreelancers, freelancers } = useContext(FreelanceContexts);
  const [servico, setServico] = useState<IServico>({
    competencia: "",
    cod_lotacao: 0,
    empenho: 0,
    fonte: 0,
    inss_patronal: 0,
    inss_retido: 0,
    salario_base: 0,
  });

  const [readOnly, setReadOnly] = useState<boolean>(false);
  const caminhoUrl = usePathname();
  const { tributoRef } = useContext(TributoContext)

  const { secretarias, erro } = useSecretaria();
  /*
    useEffect(() => {
      if (caminhoUrl === "/importar") setReadOnly(true);
    });
  */
  return (
    <Stack width={"70vw"} maxWidth={"max-content"}>
      <Flex
        flexDirection={"column"}
        border={"1px solid red"}
        padding={4}
        borderRadius={8}
        borderColor={"#106B87"}
        gap={2}
      >
        <FormControl maxWidth={"18%"}>
          <FormLabel>Competencia</FormLabel>
          <Input
            type="text"
            size={"sm"}
            value={servico?.competencia}
            onChange={(e) =>
              setServico({ ...servico, competencia: e.target.value })
            }
          />
        </FormControl>

        <Flex gap={4}>
          <FormControl maxWidth={"40%"}>
            <FormLabel>Prestador</FormLabel>
            <Input
              type="text"
              size={"sm"}
              value={freelancers?.nome}
              readOnly
              onChange={(e) =>
                setFreelancers({ ...freelancers, nome: e.target.value })
              }
            />
          </FormControl>

          <FormControl maxWidth={"40%"}>
            <FormLabel>PIS/PASEP</FormLabel>
            <Input
              type="number"
              size={"sm"}
              value={freelancers?.pisPasep}
              readOnly
              onChange={(e) =>
                setFreelancers({ ...freelancers, pisPasep: e.target.value })
              }
            />
          </FormControl>
        </Flex>

        <Flex gap={4}>
          <FormControl maxWidth={"19%"}>
            <FormLabel>Empenho</FormLabel>
            <Input
              type="text"
              size={"sm"}
              value={servico?.empenho}
              onChange={(e) =>
                setServico({ ...servico, empenho: parseFloat(e.target.value) })
              }
            />
          </FormControl>
          <FormControl maxWidth={"19%"}>
            <FormLabel>Fonte</FormLabel>
            <Input
              type="number"
              size={"sm"}
              value={servico?.fonte}
              onChange={(e) =>
                setServico({ ...servico, fonte: parseFloat(e.target.value) })
              }
            />
          </FormControl>

          <FormControl maxWidth={"40%"}>
            <FormLabel>Secretaria</FormLabel>
            <Select size={'sm'}
              placeholder={
                erro
                  ? "Nenhuma Secretaria localizada"
                  : "Selecione uma Secretaria"
              }
            >
              {secretarias.map((sec) => (
                <option
                  value={sec.descricao}
                  key={sec.codigo}
                >{`${sec.codigo} - ${sec.descricao}`}</option>
              ))}
            </Select>
          </FormControl>
        </Flex>

        <Flex alignItems={"self-end"} gap={4}>
          <FormControl maxWidth={"19%"}>
            <FormLabel>Custos</FormLabel>
            <Input
              type="text"
              size={"sm"}
              value={servico?.salario_base}
              onChange={(e) =>
                setServico({
                  ...servico,
                  salario_base: parseFloat(e.target.value),
                })
              }
            />
          </FormControl>
          <Button onClick={() => console.log(freelancers)}>
            <Text>CALCULAR</Text>
          </Button>
        </Flex>
      </Flex>

      <HStack>
        <Information value="R$33.210,15" information="INSS retido" />
        <Information value="R$33.210,15" information="Patronal" />
        <Information value="R$33.210,15" information="Total INSS" />
      </HStack>

      <Flex justifyContent={"flex-end"}>
        <Button colorScheme="blue" onClick={() => console.log(tributoRef)}>
          <Text>SALVAR</Text>
        </Button>
      </Flex>
    </Stack>
  );
};

export default FormularioServico;
