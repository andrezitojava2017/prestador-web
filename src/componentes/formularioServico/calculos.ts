import { formatarCusto } from './action';

/**
 *
 * @param base - number -  refere-se a base patronal (11%)
 * @param salario_base -string - salario  para calculo de retenção de INSS
 * @returns rs - string- com valor formatado para pt-br
 */
export const calcularSegurado = (base: number, salario_base: number) => {
  if (
    salario_base === 0 ||
    salario_base === null ||
    salario_base === undefined
  ) {
    throw new Error('Preencha o campo CUSTOS');
  }

  const rs = (base / 100) * salario_base;

  return parseFloat(rs.toFixed(2));
};

export const CalcularPatronal = (base: number, salario_base: number) => {};
