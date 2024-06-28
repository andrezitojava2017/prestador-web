import { IPrestador } from "@/interface/IPrestador";
import { consultaPisPasep } from "@/service/prestadorService";
import { SetStateAction } from "react";

/**
 * Remove números, pontos e caracteres especiais de uma string.
 *
 * @param {string} value Valor da string a ser processada.
 * @returns {string} String com os caracteres indesejados removidos.
 *
 */
export const verificarNomePrestador = (value: string): string => {
    const regex = /[^a-zA-Z\s]/g;
  
    const nomeVerificado = value.replace(regex, "");
    return nomeVerificado.toLocaleUpperCase();
  };
  
  /**
   * Esta função formata um valor PIS/PASEP para armazenamento em banco de dados,
   * removendo pontuação, letras do alfabeto e preservando espaços em branco.
   * @param value Uma string contendo o valor PIS/PASEP a ser formatado
   * @returns A função retorna uma string contendo o valor PIS/PASEP formatado, com apenas números e espaços em branco.
   */
  export const formatarPisPasepParaBancoDeDados = (value: string) => {
    // Expressão regular que remove pontuação e letras do alfabeto
    const regex = /[^0-9\s]/g;
    let pisPasep = value.replaceAll(regex, "");
    return pisPasep;
  };
  
  /**
   * verifica se o prestador já existe na base de dados
   * @param freelance - dados do prestador para verificação
   * @returns undefined - se não houver prestador
   */
  export const verificarPrestadorExisteNaBase = async (freelance: IPrestador) => {
    const rs = await consultaPisPasep(freelance);
  
    if (rs?.length !== 0) {
      throw new Error(
        `PIS-PASEP já existente na base de dados - Prestador: ${rs![0].nome}`
      );
    }
    return;
  };
  
  /**
   * Faz a verificação no objeto Freelance, set todas as informações
   * foram fornecidas
   * @param freelance parametro do tipo Freelance
   */
  export const verificarCamposPreenchidos = (freelance: IPrestador) => {
    if (
      freelance.nome === null ||
      freelance.nome === "" ||
      freelance.nome === undefined
    ) {
      throw new Error("Nome do prestador não foi informado");
    }
  
    if (
      freelance.pisPasep === "" ||
      freelance.pisPasep === null ||
      freelance.pisPasep === undefined
    ) {
      throw new Error("PIS/PASEP do prestador não foi informado");
    }
  };
  
  /**
   * Limpa os campos do formulario
   * @param setFreelance setState
   */
  export const limparFormulario = (
    setFreelance: React.Dispatch<SetStateAction<IPrestador>>
  ) => {
    setFreelance({ nome: "", pisPasep: "" });
  };
  