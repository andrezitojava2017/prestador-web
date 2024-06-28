import { IServico } from "@/interface/IServico";
import { IPrestador } from "@/interface/IPrestador";
import supabase from "@/lib/supabase";

export const inserirNovoServico = async (
  servico: IServico,
  autonomo: IPrestador
) => {
  const { data, error } = await supabase
    .from("db_servicos")
    .insert({ ...servico, pispasep: autonomo.pisPasep })
    .select();

  if (error) {
    console.warn(
      "Ocorreu um erro ao tentar registar novo serviço\n",
      error?.message
    );
    throw new Error("Ocorreu um erro ao tentar registar novo serviço");
  }

  console.log(data);
  return;
};

export const buscarServico = async (competencia: string) => {
  
  let { data: db_servico, error } = await supabase
    .from("db_servico")
    .select(
      `*,
      db_pessoas (pispasep, nome)`
    )
    .eq("competencia", competencia)


  if (error) {
    console.log("erro na consulta\n", error);
    throw new Error(
      "Ocorreu um erro na tentativa de recuperar serviços lançados"
    );
  }
  console.log(db_servico);
  return db_servico;
};
