import { michroma } from "@/app/fonts/fonts";
import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  text: string;
  buttonReturn: boolean;
};

const Head = ({ text, buttonReturn }: Props) => {
  return (
    <Box padding={6}>
      <HStack>
        {buttonReturn ? (
          <Link href={"/"}>
            <IoMdArrowRoundBack size={20} color={"#106B87"} />
          </Link>
        ) : null}
        <Text fontFamily={michroma.style.fontFamily} color={"#106B87"}>
          {text}
        </Text>
      </HStack>
      <Divider />
    </Box>
  );
};

export default Head;
