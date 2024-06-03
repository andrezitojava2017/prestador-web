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
} from "@chakra-ui/react";
import Information from "../information/information";
import { useContext, useEffect, useState } from "react";
import { FreelanceContexts } from "@/context/FreelanceContext";
import { IServico } from "@/interface/IServico";
import useSecretaria from "@/hook/useSecretarias";
import { TributoContext } from "@/context/tributoContext";
import { formatarCusto, verificaPreenchimentoCamposServico } from "./action";
import { calcularSegurado } from "./calculos";

const FormularioServico = () => {
  const [habilitaNovo, setHabilitaNovo] = useState<boolean>(false)
  const { setFreelancers, freelancers } = useContext(FreelanceContexts);
  const [servico, setServico] = useState<IServico>({
    competencia: "",
    cod_lotacao: 0,
    empenho: 0,
    fonte: 0,
    inss_patronal: 0,
    inss_retido: 0,
    salario_base: '',
  });

  const { tributoRef } = useContext(TributoContext)
  const { secretarias, erro } = useSecretaria();

  useEffect(() => {
    if (tributoRef.competencia === '') setHabilitaNovo(true);

  }, []);



  const inserirNovoServico = async () => {
    try {

      verificaPreenchimentoCamposServico(servico, freelancers)
      // await novoServico(servico, freelancers)

    } catch (error) {
      console.log('erro ao gravar registro')
    }
  }



  const calcularInss = () => {

    try {
      const salBase = formatarCusto(servico.salario_base)

      let retido = calcularSegurado(tributoRef.patronal, salBase)
      setServico({ ...servico, inss_retido: retido })

      console.log(tributoRef.patronal);

    } catch (error) {
      console.warn(error);

    }


    //setServico({ ...servico, inss_retido: retido })

  }

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
            value={tributoRef.competencia}
            readOnly
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
                  salario_base: e.target.value,
                })

              }
            />
          </FormControl>
          <Button /*onClick={() => calcularSegurado(tributoRef.patronal, servico.salario_base)} */
            onClick={calcularInss}
          >
            <Text>CALCULAR</Text>
          </Button>
        </Flex>
      </Flex>

      <HStack>
        <Information value={servico.inss_retido} information="INSS retido" />
        <Information value={servico.inss_patronal || 0} information="Total INSS" />
        <Information value={servico.inss_patronal || 0} information="Patronal" />
      </HStack>

      <Flex justifyContent={"flex-end"}>
        <Button
          isDisabled={habilitaNovo}
          colorScheme="blue"
          onClick={() => inserirNovoServico()}
        >
          <Text>SALVAR</Text>
        </Button>
      </Flex>
    </Stack>
  );
};

export default FormularioServico;
