"use client";

import { Freelance } from "@/interface/freelance";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  formatarPisPasepParaBancoDeDados,
  verificarCamposPreenchidos,
  verificarNomePrestador,
  verificarPrestadorExisteNaBase,
} from "./actions";
import { incluirNovoPrestador } from "@/service/prestadorService";

type Props = {
  close: () => void;
};
const ModalContentNewProvider = ({ close }: Props) => {
  const toast = useToast();
  const [freelance, setFreelance] = useState<Freelance>({
    nome: "",
    pisPasep: "",
  });
  const [mensagem, setMensagem] = useState<{
    message: string;
    type: "info" | "warning" | "error" | "success";
    title: string;
  }>();

  useEffect(() => {
    if (mensagem) {
      toast({
        title: mensagem!.title,
        description: mensagem!.message,
        status: mensagem!.type,
        duration: 5000,
        isClosable: true,
      });
    }
  }, [mensagem]);

  const salvarNovoPrestador = async () => {
    try {
      // faz verificação se todos os campos estão preenchidos
      verificarCamposPreenchidos(freelance);

      // verifica se pispasep já existe na base de dados
      await verificarPrestadorExisteNaBase(freelance);

      await incluirNovoPrestador(freelance);
      
    } catch (error: any) {
      console.warn(error.message);
      setMensagem({ title: "Atenção", message: error.message, type: "error" });
    }
  };

  return (
    <ModalContent>
      <ModalHeader>Cadastro de Novo Prestador</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={freelance.nome}
            onChange={(text) => {
              let v = verificarNomePrestador(text.target.value);
              setFreelance({ ...freelance, nome: v });
            }}
          />
          <FormHelperText>Nome completo do prestador</FormHelperText>
        </FormControl>
        <FormControl marginTop={8}>
          <FormLabel>PIS/PASEP</FormLabel>
          <Input
            type="text"
            value={freelance.pisPasep}
            onChange={(text) => {
              let v = formatarPisPasepParaBancoDeDados(text.target.value);
              setFreelance({ ...freelance, pisPasep: v });
            }}
          />
          <FormHelperText>Numero de PIS/PASEP</FormHelperText>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" onClick={() => salvarNovoPrestador()}>
          Salvar
        </Button>
        <Button variant="cyan" mr={3} onClick={close}>
          Sair
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ModalContentNewProvider;
