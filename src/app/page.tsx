import { ChakraProvider, HStack, Stack } from "@chakra-ui/react";
import BarraNavegacao from "@/componentes/navbar";
import Head from "@/componentes/head/head";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <Stack height={'100vh'}>
      <Head text="Pagina Principal"/>
    </Stack>
  );
}
