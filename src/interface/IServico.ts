import { IPrestador } from './IPrestador';
import { ISecretaria } from './ISecretaria';

export interface IServico {
  id?: number;
  competencia?: string;
  empenho: number;
  fonte: number;
  pisPasep?: number;
  inss_retido: number;
  inss_patronal: number;
  salario_base: string;
  cod_dotacao: number;
  pessoa?: IPrestador;
  lotacao?: ISecretaria;
}
