import { michroma } from "@/app/fonts/fonts";
import { Box, Divider, Text } from "@chakra-ui/react";

type Props = {
  text: string;
};

const Head = ({ text }: Props) => {
  return (
    <Box padding={6}>
      <Text fontFamily={michroma.style.fontFamily} color={"#106B87"}>
        {text}
      </Text>
      <Divider />
    </Box>
  );
};

export default Head;
