import { ITributos } from "@/interface/ITributos";
import supabase from "@/lib/supabase";
import { instance } from "@/utils/api/config";

export const inserirConfigTributo = async (info: ITributos, token: string) => {
  try {
    const rs = await instance.post(
      "/config/tax/new",
      {
        max_recolher: info.max_recolhimento,
        segurado: info.base_segurado,
        patronal: info.base_patronal,
        competencia: info.competencia,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (rs.status != 200)
      throw new Error("Ocorreu um erro na gravação dos dados");
  } catch (error) {
    console.warn("Erro ocorrido: ", error);

    throw error;
  }

  /*
  const { data, error } = await supabase
    .from('db_tributo')
    .insert(info)
    .select();

  if (error) {
    console.warn('Ocorreu um erro na gravação\n', error.message);
    throw new Error('Ocorreu um erro na gravação dos dados');
  }

  console.log(data);
  */
};

export const recuperarListaTributoMensal = async () => {


  let { data: db_tributo, error } = await supabase
    .from("db_tributo")
    .select("*");

  if (error) {
    console.warn(
      "Ocorreu um erro ao tentar recuperar lista de Tributos\n",
      error
    );
    throw new Error("Ocorreu um erro ao tentar recuperar lista de Tributos");
  }

  return db_tributo;
 
};

export const atualizarConfiguracao = async (
  tributos: ITributos,
  token: string
) => {
  try {
    const rs = await instance.post(
      "/config/tax/update",
      {
        id: tributos.id,
        max_recolher: tributos.max_recolhimento,
        segurado: tributos.base_segurado,
        patronal: tributos.base_patronal,
        competencia: tributos.competencia,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (rs.status != 200)
      throw new Error("Nao foi possivel atualizar os dados!");
  } catch (error) {
    console.warn("Erro ocorrido: ", error);
    throw error;
  }
  /*
  const { data, error } = await supabase
    .from("db_tributo")
    .update(tributos)
    .eq("id", tributos.id)
    .select();

  if (error) {
    console.log("ocorreu um erro na atualização\n", error);
    throw new Error("Nao foi possivel atualizar os dados!");
  }

  console.log(data);
  */
};
