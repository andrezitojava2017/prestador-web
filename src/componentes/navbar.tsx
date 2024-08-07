import {
  Avatar,
  Box,
  Flex,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { FaIdCardClip } from "react-icons/fa6";
import { MdAssuredWorkload } from "react-icons/md";
import { LuUpload } from "react-icons/lu";
import { MdSettingsApplications } from "react-icons/md";
import Link from "next/link";
import Perfil from "./avatar/avatar";

const BarraNavegacao = () => {
  return (
    <Box flexDirection={"column"}>
      <Flex
        height={"100vh"}
        flexDirection={"column"}
        alignItems={"center"}
        backgroundColor={"#106B87"}
        width={"15vw"}
      >
        <VStack alignItems={"center"} justifyContent={"center"} padding={4}>
          { /*
          <Avatar
            name="Jederson Andre"
            width={100}
            height={100}
            background={"white"}
          />
          */}
          <Perfil/>
          <Text fontSize={12} color={"#ffff"} textAlign={"center"}>
            Municipio de São José do Xingu-MT
          </Text>
        </VStack>
        <Divider />
        <VStack marginTop={8} minWidth={"100%"}>
          <Link href={"/prestador"} style={{ width: "100%" }}>
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              _hover={{ background: "#157A8C", cursor: "pointer" }}
              width={"100%"}
              padding={2}
            >
              <FaIdCardClip size={30} color="#ffff" />
              <Text fontSize={12} color="#ffff">
                Prestador
              </Text>
            </Flex>
          </Link>

          <Link href={"/servicos"} style={{ width: "100%" }}>
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              width={"100%"}
              padding={2}
              _hover={{ background: "#157A8C", cursor: "pointer" }}
            >
              <MdAssuredWorkload size={30} color="#ffff" />
              <Text fontSize={12} color="#ffff">
                Serviços
              </Text>
            </Flex>
          </Link>

          <Link href={"/importar"} style={{ width: "100%" }}>
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              width={"100%"}
              padding={2}
              _hover={{ background: "#157A8C", cursor: "pointer" }}
            >
              <LuUpload size={30} color="#ffff" />
              <Text fontSize={12} color="#ffff">
                Importar arquivo
              </Text>
            </Flex>
          </Link>

          <Link href={"/configuracao"} style={{ width: "100%" }}>
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              width={"100%"}
              padding={2}
              _hover={{ background: "#157A8C", cursor: "pointer" }}
            >
              <MdSettingsApplications size={30} color="#ffff" />
              <Text fontSize={12} color="#ffff">
                Configuração
              </Text>
            </Flex>
          </Link>
        </VStack>
      </Flex>
    </Box>
  );
};

export default BarraNavegacao;
