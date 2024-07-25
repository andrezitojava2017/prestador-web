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
  cod_lotacao: number;
  db_pessoas?: IPrestador;
  db_lotacao?: ISecretaria;
}
