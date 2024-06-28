import { IServico } from "@/interface/IServico";
import { IPrestador } from "@/interface/IPrestador";
import { consultaPisPasep } from "@/service/prestadorService";
import { inserirNovoServico } from "@/service/servicosService";

export const verificaPreenchimentoCamposServico = (
  servico: IServico,
  autonomo: IPrestador
) => {
  if (
    servico.competencia === "" ||
    servico.competencia === undefined ||
    servico.competencia === null
  ) {
    throw new Error("É necessário definir uma competencia na pagina principal");
  }

  if (
    servico.empenho === 0 ||
    servico.empenho === undefined ||
    servico.empenho === null
  ) {
    throw new Error("Campo empenho não foi preenchido");
  }

  if (
    servico.fonte === 0 ||
    servico.fonte === undefined ||
    servico.fonte === null
  ) {
    throw new Error("Campo fonte não foi preenchido");
  }

  if (
    servico.salario_base === "" ||
    servico.salario_base === undefined ||
    servico.salario_base === null
  ) {
    throw new Error("Campo de custos não foi preenchido");
  }

  if (
    servico.inss_retido === 0 ||
    servico.inss_retido === undefined ||
    servico.inss_retido === null
  ) {
    throw new Error("Calculo de INSS retido não foi executado");
  }

  if (
    servico.inss_patronal === 0 ||
    servico.inss_patronal === undefined ||
    servico.inss_patronal === null
  ) {
    throw new Error("Calculo de INSS patronal não foi executado");
  }

  if (
    servico.cod_lotacao === 0 ||
    servico.cod_lotacao === undefined ||
    servico.cod_lotacao === null
  ) {
    throw new Error("A secretaria não foi selecionada");
  }

  if (
    autonomo.nome === "" ||
    autonomo.nome === undefined ||
    autonomo.nome === null
  ) {
    throw new Error("É preciso selecionar um prestador na lista");
  }

  if (
    autonomo.pisPasep === "" ||
    autonomo.pisPasep === undefined ||
    autonomo.pisPasep === null
  ) {
    throw new Error("O campo PIS/PASEP não foi preenchido");
  }
};

export const novoServico = async (servico: IServico, autonomo: IPrestador) => {
  const rs = await inserirNovoServico(servico, autonomo);
};

/**
 * Função para tratar os valores de string para decimais,
 * para que possam ser calculados de forma correta
 *
 * @param value string padrão 1234,56
 * @returns float - 1234.56
 */
export const formatarCusto = (value: string) => {
  if (!value) throw new Error("Preencha o campo CUSTOS");
 // value = value.replaceAll(".", "").replace(",", ".");

  return parseFloat(value);
};

export const verificarPisPasepExiste = async (freelance: IPrestador) => {
  try {
    const rs = await consultaPisPasep(freelance);
    return rs;
    
  } catch (error) {
    throw error;
  }
};
