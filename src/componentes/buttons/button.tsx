import { inter } from "@/app/fonts/fonts";
import {
  Flex,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  description: string;
  icon: ReactNode;
  action?: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  modalContentProvider: ReactNode;
};

const Option = (props: Props) => {
  return (
    <Flex
      // border={"1px solid red"}
      background={"#157A8C"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"15vw"}
      height={"18vh"}
      _hover={{ cursor: "pointer", background: "#106B87" }}
      onClick={props.onOpen}
    >
      {props.icon}
      <Text color={"white"} fontFamily={inter.style.fontFamily}>
        {props.description}
      </Text>
      <>
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
          <ModalOverlay />
          {props.modalContentProvider}
        </Modal>
      </>
    </Flex>
  );
};

export default Option;
