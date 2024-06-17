import { ISecretaria } from "@/interface/ISecretaria";
import { ITributos } from "@/interface/ITributos";
import { Freelance } from "@/interface/freelance";
import { AtualizarDadosPrestadorService } from "@/service/prestadorService";

export const AtualizarDadosPrestador = async (data: Freelance) => {
  await AtualizarDadosPrestadorService(data);
};

export const validarDadosConfiguracaoTributo = (tributo: ITributos) => {
  if (
    tributo.competencia === null ||
    tributo.competencia === undefined ||
    tributo.competencia === ""
  ) {
    throw new Error("Competencia não foi informada");
  }
  if (
    tributo.max_recolhimento === null ||
    tributo.max_recolhimento === undefined ||
    tributo.max_recolhimento === 0 ||
    Number.isNaN(tributo.max_recolhimento)

  ) {
    throw new Error("Maximo de recolhimento não foi informado");
  }
  if (
    tributo.base_patronal === null ||
    tributo.base_patronal === undefined ||
    tributo.base_patronal === 0 ||
    Number.isNaN(tributo.base_patronal)
  ) {
    throw new Error("Patronal não foi informado");
  }

  if (
    tributo.base_segurado === null ||
    tributo.base_segurado === undefined ||
    tributo.base_segurado === 0 ||    
    Number.isNaN(tributo.base_segurado)
  ) {
    throw new Error("Segurado não foi informado");
  }
};

export const validarDadosSecretaria = (secretaria: ISecretaria) => {
  if (
    secretaria.codigo === null ||
    secretaria.codigo === 0 ||
    secretaria.codigo === undefined
  ) {
    throw new Error("Codigo nao foi informado");
  }
  if (
    secretaria.descricao === null ||
    secretaria.descricao === "" ||
    secretaria.descricao === undefined
  ) {
    throw new Error("Descrição nao foi informado");
  }
};
