import { IServico } from "@/interface/IServico";
import { IPrestador } from "@/interface/IPrestador";
import supabase from "@/lib/supabase";
import { instance } from "@/utils/api/config";
import { headers } from "next/headers";

export const inserirNovoServico = async (
  servico: IServico,
  autonomo: IPrestador,
  token: string
) => {
  try {
    const rs = await instance.post(
      "/freelance/service/new",
      {
        ...servico,
        pis_pasep: autonomo.pis_pasep,
      },
      {
        headers: {
          Authorization: token,
          service: true,
        },
      }
    );

    return rs;
  } catch (error) {
    console.log("erro ocorrido ", error);
    throw error;
  }
  /*
  const { data, error } = await supabase
    .from("db_servico")
    .insert({ ...servico, pisPasep: autonomo.pis_pasep })
    .select();

  if (error) {
    console.warn(
      "Ocorreu um erro ao tentar registar novo serviço\n",
      error?.message
    );
    throw new Error("Ocorreu um erro ao tentar registar novo serviço");
  }

  return;
  */
};

export const buscarServico = async (competencia: string, token: string) => {
  try {
    const rs = await instance.post(
      "/freelance/service/list",
      {
        referencia: competencia,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    return rs;
  } catch (error) {
    throw new Error(
      "Ocorreu um erro na tentativa de recuperar serviços lançados"
    );
  }
  /*
  let { data: db_servico, error } = await supabase
    .from("db_servico")
    .select(
      `*,
      db_pessoas (pisPasep, nome),
      db_lotacao (descricao)`
    )
    .eq("competencia", competencia);

  if (error) {
    console.log("erro na consulta\n", error);
    throw new Error(
      "Ocorreu um erro na tentativa de recuperar serviços lançados"
    );
  }

  return db_servico;
  */
};

export const relatorioResumoGuia = async (competencia: string, token:string) => {

  try {
    const data = await instance.get(`/freelance/rel/${competencia}`,{
      
      headers:{
        authorization: token
      },

    });

    return data.data;

  } catch (error:any) {
    console.warn('Erro ocorrido: ', error.message)
    throw error;
  }
/*

  let { data, error } = await supabase.rpc("resumo_guias", {
    competencia_param: competencia,
  });
  if (error) {
    console.warn(error);
    throw new Error(
      "Ocorreu um erro na captura de dados para gerar relatorio de resumo"
    );
  }
    */
};

export const atualizarServiço = async (servico: IServico, token: string) => {
  try {
    instance.patch(
      "/freelance/service/update",
      { ...servico },
      {
        headers: {
          authorization: token,
        },
      }
    );
  } catch (error:any) {
    console.warn('Erro ocorrido: ', error.message)
    throw error;
  }
  /*
  const { data, error } = await supabase
    .from("db_servico")
    .update(servico)
    .eq("id", servico.id)
    .select();

  if (error) {
    console.warn("ocorreu um erro na atualização\n", error);
    throw new Error("Ocorreu um erro na atualização");
  }

  console.log(data);
  */
};
