export interface IServico {
  id?: number;
  competencia: string;
  empenho: number;
  fonte: number;
  pispasep?: number;
  inss_retido: number;
  inss_patronal: number;
  salario_base: string;
  cod_lotacao: number;
}
