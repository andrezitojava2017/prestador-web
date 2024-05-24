import { Freelance } from "@/interface/freelance";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { formatarPisPasepParaBancoDeDados, verificarNomePrestador } from "../modals/actions";

const FormularioPrestador = () => {
    const [freelance, setFreelance] = useState<Freelance>({
        nome: "",
        pisPasep: "",
      });
  return (
    <>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input
          type="text"
          value={freelance.nome}
          onChange={(text) => {
            let v = verificarNomePrestador(text.target.value);
            setFreelance({ ...freelance, nome: v });
          }}
        />
        <FormHelperText>Nome completo do prestador</FormHelperText>
      </FormControl>
      <FormControl marginTop={8}>
        <FormLabel>PIS/PASEP</FormLabel>
        <Input
          type="text"
          value={freelance.pisPasep}
          onChange={(text) => {
            let v = formatarPisPasepParaBancoDeDados(text.target.value);
            setFreelance({ ...freelance, pisPasep: v });
          }}
        />
        <FormHelperText>Numero de PIS/PASEP</FormHelperText>
      </FormControl>
    </>
  );
};

export default FormularioPrestador;