import { TributoContext } from "@/context/tributoContext";
import { validarCompetencia } from "@/utils/configuracao/actions";
import {
  VStack,
  FormControl,
  Input,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useContext, useState } from "react";



const FormularioConfigTeto = () => {

  const { tributoRef, setTributoRef } = useContext(TributoContext);
  const [errorCompetencia, setErrorCompetencia] = useState<boolean>(true);

  /**
   * validação com padrao regex: MM/yyyy
   * @param e string
   */
  const validarCampoObrigatorioCompetencia = (e: string) => {
    setErrorCompetencia((prev) => !validarCompetencia(e));
    if (errorCompetencia) setTributoRef({ ...tributoRef, competencia: e });
  };

  return (
    <VStack gap={4}>
      <FormControl>
        <FormLabel>Maximo a recolher</FormLabel>
        <Input
          type="number"
          value={tributoRef?.max_recolhimento}
          onChange={(e) =>
            setTributoRef({
              ...tributoRef,
              max_recolhimento: parseFloat(e.target.value),
            })
          }
        />
        <FormHelperText>Limite de retenção de INSS</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Patronal ( % )</FormLabel>
        <Input
          type="number"
          value={tributoRef.base_patronal}
          onChange={(e) =>
            setTributoRef({
              ...tributoRef,
              base_patronal: parseFloat(e.target.value),
            })
          }
        />
        <FormHelperText>parte da empresa (20%)</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Segurado ( % )</FormLabel>
        <Input
          type="number"
          value={tributoRef.base_segurado}
          onChange={(e) =>
            setTributoRef({
              ...tributoRef,
              base_segurado: parseFloat(e.target.value),
            })
          }
        />
        <FormHelperText>parte da segurado (11%)</FormHelperText>
      </FormControl>

      <FormControl isInvalid={errorCompetencia}>
        <FormLabel>Competencia</FormLabel>
        <Input
          type="text"
          value={tributoRef?.competencia}
          onChange={(e) => {
            validarCampoObrigatorioCompetencia(e.target.value);
          }}
        />
        {!errorCompetencia ? (
          <FormHelperText color={"green"}>Competencia valida</FormHelperText>
        ) : (
          <FormErrorMessage>Competencia inválida</FormErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};


export default FormularioConfigTeto