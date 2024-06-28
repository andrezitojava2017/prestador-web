import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FreelanceContexts } from "@/context/FreelanceContext";
import { formatarPisPasepParaBancoDeDados, verificarNomePrestador } from "@/utils/prestador/actions";


/**
 * Esse componente de formulario será utilizado no drawer para atualizar
 * dados do prestador que for selecionado na tabela de busca
 * Componente generico que poderá também ser utilizado no cadastro para novo prestador
 * @returns 
 */

const FormularioPrestador = () => {

  const {freelancers, setFreelancers} = useContext(FreelanceContexts)
/*
    const [freelance, setFreelance] = useState<Freelance>({
        nome: "",
        pisPasep: "",
      });
*/
  return (
    <>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input
          type="text"
          value={freelancers.nome}
          onChange={(text) => {
            let v = verificarNomePrestador(text.target.value); // trazeer aqruivo actions para diretorio drawer
            setFreelancers({ ...freelancers, nome: v });
          }}
        />
        <FormHelperText>Nome completo do prestador</FormHelperText>
      </FormControl>
      <FormControl marginTop={8}>
        <FormLabel>PIS/PASEP</FormLabel>
        <Input
          type="text"
          value={freelancers.pispasep}
          onChange={(text) => {
            let v = formatarPisPasepParaBancoDeDados(text.target.value); // trazeer aqruivo actions para diretorio drawer
            setFreelancers({ ...freelancers, pisPasep: v });
          }}
        />
        <FormHelperText>Numero de PIS/PASEP</FormHelperText>
      </FormControl>
    </>
  );
};

export default FormularioPrestador;