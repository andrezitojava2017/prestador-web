import { ISecretaria } from "@/interface/ISecretaria";
import supabase from "@/lib/supabase";

export const adicionarNovaSecretaria = async (secretaria: ISecretaria) => {
  const { data, error } = await supabase
    .from("db_lotacao")
    .insert(secretaria)
    .select();

    if(error){
        console.warn('Ocorreu um erro na gravação\n', error.message)
        throw new Error('Ocorreu um erro na gravação')
    }
   console.log(data)
};
