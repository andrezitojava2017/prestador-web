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
    tributo.max_recolhimento === 0
  ) {
    throw new Error("Maximo de recolhimento não foi informada");
  }
  if (
    tributo.patronal === null ||
    tributo.patronal === undefined ||
    tributo.patronal === 0
  ) {
    throw new Error("Patronal não foi informada");
  }
};
