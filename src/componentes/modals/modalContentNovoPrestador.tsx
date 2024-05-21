"use client";

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
} from "@chakra-ui/react";

type Props = {
  close: () => void;
};
const ModalContentNewProvider = ({ close }: Props) => {
  return (
    <ModalContent>
      <ModalHeader>Cadastro de Novo Prestador</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input type="text" />
          <FormHelperText>Nome completo do prestador</FormHelperText>
        </FormControl>
        <FormControl marginTop={8}>
          <FormLabel>PIS/PASEP</FormLabel>
          <Input type="text" />
          <FormHelperText>Numero de PIS/PASEP</FormHelperText>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue">Salvar</Button>
        <Button variant="cyan" mr={3} onClick={close}>
          Sair
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ModalContentNewProvider;
