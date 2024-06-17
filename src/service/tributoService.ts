import { ITributos } from '@/interface/ITributos';
import supabase from '@/lib/supabase';

export const inserirConfigTributo = async (info: ITributos) => {
  const { data, error } = await supabase
    .from('db_tributo')
    .insert(info)
    .select();

  if (error) {
    console.warn('Ocorreu um erro na gravação\n', error.message);
    throw new Error('Ocorreu um erro na gravação dos dados');
  }

  console.log(data);
};

export const recuperarListaTributoMensal = async () => {
  let { data: db_tributo, error } = await supabase
    .from('db_tributo')
    .select('*');

  if (error) {
    console.warn(
      'Ocorreu um erro ao tentar recuperar lista de Tributos\n',
      error
    );
    throw new Error('Ocorreu um erro ao tentar recuperar lista de Tributos');
  }

  return db_tributo;
};

export const atualizarConfiguracao = async(tributos:ITributos)=>{

  const { data, error } = await supabase
  .from('db_tributo')
  .update(tributos)
  .eq('id', tributos.id)
  .select()

  if(error){
    console.log('ocorreu um erro na atualização\n', error)
    throw new Error('Nao foi possivel atualizar os dados!')
  }

  console.log(data)
          
}