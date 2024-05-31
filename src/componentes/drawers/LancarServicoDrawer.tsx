import { Freelance } from "@/interface/freelance";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { FreelanceContexts } from "@/context/FreelanceContext";
import FormularioServico from "../formularioServico/FormularioServico";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

type Props = {
  data: Freelance;
  icone: ReactNode;
};

const LancarServicoDrawer = (props: Props) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setFreelancers, freelancers } = useContext(FreelanceContexts);


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
        {/*  <TbArrowBigRightLinesFilled size={18} color="blue" />*/}
        {props.icone}
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'xl'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Lançar Serviço</DrawerHeader>

          <DrawerBody>
            <FormularioServico />
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LancarServicoDrawer;
