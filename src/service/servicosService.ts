import { IServico } from '@/interface/IServico';
import { Freelance } from '@/interface/freelance';
import supabase from '@/lib/supabase';

export const inserirNovoServico = async (
  servico: IServico,
  autonomo: Freelance
) => {
  const { data, error } = await supabase
    .from('db_servicos')
    .insert({ ...servico, pispasep: autonomo.pisPasep })
    .select();

  if (error) {
    console.warn(
      'Ocorreu um erro ao tentar registar novo serviço\n',
      error?.message
    );
    throw new Error('Ocorreu um erro ao tentar registar novo serviço');
  }

  console.log(data);
  return;
};
