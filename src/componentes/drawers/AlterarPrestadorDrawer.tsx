import { IPrestador } from "@/interface/IPrestador";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  useDisclosure,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import FormularioPrestador from "../FormularioPrestador/FormularioPrestador";
import { FreelanceContexts } from "@/context/FreelanceContext";
import { AtualizarDadosPrestador } from "./action";

type Props = {
  data: IPrestador;
};

const AlterarPrestadorDrawer = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const { setFreelancers, freelancers } = useContext(FreelanceContexts);

  const atualizarInfo = async () => {
    setLoading(true);

    try {

      await AtualizarDadosPrestador(freelancers);
      setLoading(false);

    } catch (error: any) {

      toast({
        title: "Atenção",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (props.data) setFreelancers(props.data);
  }, [props.data]);

  return (
    <>
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        onClick={() => onOpen()}
        _hover={{ cursor: 'pointer' }}
      >
        <Text fontSize={10}>Editar</Text>
        <FaUserEdit size={18} color="green" />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Alterar Dados de Prestador</DrawerHeader>

          <DrawerBody>
            <FormularioPrestador />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              isLoading={loading}
              loadingText={'Aguarde...'}
              onClick={() => atualizarInfo()}
            >
              Atualizar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AlterarPrestadorDrawer;
