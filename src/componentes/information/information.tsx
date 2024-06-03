import { michroma } from "@/app/fonts/fonts";
import { Flex, HStack, Text } from "@chakra-ui/react";

type Props = {
  information: string;
  value: number;
}

const Information = ({ value, information }: Props) => {
  return (
    <Flex
      flexDirection={"column"}
      background={"#43DD65"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={6}
    >
      <Text
        fontFamily={michroma.style.fontFamily}
        fontSize={24}
        //color={"#106B87"}
        color='white'
      >
        {value.toLocaleString('pt-br',{style:'currency', currency:'BRL'})}
      </Text>
      <Text
        fontFamily={michroma.style.fontFamily}
        fontSize={14}
        color={"#106B87"}
      >
        {information}
      </Text>
    </Flex>
  );
};

export default Information;
