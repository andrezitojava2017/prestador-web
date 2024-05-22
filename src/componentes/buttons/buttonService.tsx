import { inter } from "@/app/fonts/fonts";
import {
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  description: string;
  icon: ReactNode;
  action?: () => void;
};

const ButtonService = (props: Props) => {
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
    >
      {props.icon}
      <Text color={"white"} fontFamily={inter.style.fontFamily}>
        {props.description}
      </Text>
    </Flex>
  );
};

export default ButtonService;
