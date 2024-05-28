import { ITributos } from "@/interface/ITributos";
import supabase from "@/lib/supabase";

export const inserirConfigTributo = async (info: ITributos) => {
  const { data, error } = await supabase
    .from("db_tributo")
    .insert(info)
    .select();

    if(error){
        console.warn('Ocorreu um erro na gravação\n', error.message)
        throw new Error('Ocorreu um erro na gravação dos dados')
    }

    console.log(data);
    
};
