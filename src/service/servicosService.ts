import { IServico } from "@/interface/IServico";
import { IPrestador } from "@/interface/IPrestador";
import supabase from "@/lib/supabase";

export const inserirNovoServico = async (
  servico: IServico,
  autonomo: IPrestador
) => {
  const { data, error } = await supabase
    .from("db_servico")
    .insert({ ...servico, pisPasep: autonomo.pisPasep })
    .select();

  if (error) {
    console.warn(
      "Ocorreu um erro ao tentar registar novo serviço\n",
      error?.message
    );
    throw new Error("Ocorreu um erro ao tentar registar novo serviço");
  }

  return;
};

export const buscarServico = async (competencia: string) => {
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
};

export const relatorioResumoGuia = async (competencia: string) => {
  let { data, error } = await supabase.rpc("resumo_guias", {
    competencia_param: competencia,
  });
  if (error) {
    console.warn(error)
    throw new Error(
      "Ocorreu um erro na captura de dados para gerar relatorio de resumo"
    );
  }
  return data;
};
