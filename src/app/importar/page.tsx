"use client";

import Head from "@/componentes/head/head";
import TableOfServices from "@/componentes/upload/table";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { readLinesOfFile } from "./actions";
import { ChangeEvent, useState } from "react";
import {Freelance} from '../../interface/freelance'



const ImportFile = () => {

  const [freelanceList, setFreelanceList] = useState<Freelance[]>([])

  const readFileFreelance = async(file:ChangeEvent<HTMLInputElement>)=>{

    const list = await readLinesOfFile(file)
    setFreelanceList(list)
  
  }


  return (
    <Stack height={"100vh"}>
      <Head text="Importar arquivo .RE" />

      <Stack
        marginLeft={6}
        width={"40%"}
        border={"1px solid #106B87"}
        borderRadius={8}
        padding={4}
      >
        <FormControl>
          <FormLabel>Importar arquivo</FormLabel>
          <Input type="file" accept=".re" onChange={(file)=> readFileFreelance(file)}/>
          <FormHelperText>Arquivo com extensao .RE</FormHelperText>
        </FormControl>
      </Stack>

    
      <Stack maxHeight={"50vh"} marginTop={8}>
        <TableOfServices data={freelanceList} />
      </Stack>
    </Stack>
  );
};

export default ImportFile;
