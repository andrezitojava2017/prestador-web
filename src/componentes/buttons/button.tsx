import { inter } from "@/app/fonts/fonts";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

type Props = {
  description: string;
  icon: ReactNode;
  action?:()=>void;
};
const Button = (props: Props) => {
  return (
    <Flex
     // border={"1px solid red"}
      background={"#157A8C"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"15vw"}
      height={"18vh"}
      _hover={{cursor:'pointer', background:'#106B87'}}
      onClick={props.action}
    >
      {props.icon}
      <Text color={"white"} fontFamily={inter.style.fontFamily}>
        {props.description}
      </Text>
    </Flex>
  );
};

export default Button;
