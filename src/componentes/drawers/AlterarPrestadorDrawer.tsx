import { Freelance } from "@/interface/freelance";
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import FormularioPrestador from "../FormularioPrestador/FormularioPrestador";

type Props = {
  data: Freelance;
};

const AlterarPrestadorDrawer = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [prestador, setPrestador] = useState<Freelance>({nome:'', pisPasep:'',});

  useEffect(() => {
    if (props.data) setPrestador(props.data);
  }, [prestador]);

  return (
    <>
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        onClick={() => onOpen()}
      >
        <Text fontSize={10}>Editar</Text>
        <FaUserEdit size={18} color="green" />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <FormularioPrestador />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => console.log(props.data)}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AlterarPrestadorDrawer;
