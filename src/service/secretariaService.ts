import { ISecretaria } from "@/interface/ISecretaria";
import supabase from "@/lib/supabase";

export const adicionarNovaSecretaria = async (secretaria: ISecretaria) => {
  const { data, error } = await supabase
    .from("db_lotacao")
    .insert(secretaria)
    .select();

  if (error) {
    console.warn("Ocorreu um erro na gravação\n", error.message);
    throw new Error("Ocorreu um erro na gravação");
  }
  console.log(data);
};

export const recuperarListaSecretarias = async () => {
  let { data: db_lotacao, error } = await supabase
    .from("db_lotacao")
    .select("*");

    if(error){
      console.warn('Ocorreu um erro na tentativa de recuperar lista de Lotação/Secretaria\n', error.message)
      throw new Error('Ocorreu um erro na tentativa de recuperar lista de Lotação/Secretaria')
    }
    return db_lotacao
};
