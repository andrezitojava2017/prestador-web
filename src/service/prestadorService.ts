import { IPesquisa } from "@/interface/IPesquisa";
import { IPrestador } from "@/interface/IPrestador";
import supabase from "@/lib/supabase";

/**
 * Esta função assincrona inclui um novo prestador de serviços na base de dados
 * @param freelance Um objeto Freelance contendo os dados do prestador a ser incluído.
 * @returns A função retorna uma promessa que resolve para um objeto
 * contendo os dados do prestador incluído, ou rejeita para um erro caso a inclusão falhe.
 */
export const incluirNovoPrestador = async (freelance: IPrestador) => {
  const { data, error } = await supabase
    .from("db_pessoas")
    .insert([freelance])
    .select();

  if (error) {
    console.log(
      "Ocorreu um erro na tentativa de incluir novo prestador\n",
      error
    );
    throw new Error("Ocorreu um erro na tentativa de incluir novo prestador");
  }

  return data;
};

export const consultaPisPasep = async (freelance: IPrestador) => {
  let { data: db_pessoas, error } = await supabase
    .from("db_pessoas")
    .select("*")
    .eq("pisPasep", freelance.pisPasep);

  if (error) {
    console.log(
      "ocorreu um erro ao tentar verificar pispasep na base de dados\n",
      error
    );
    throw new Error("Erro ao tentar consultar PIS/PASEP na base de dados");
  }

  return db_pessoas;
};

export const buscarPrestador = async (value: string) => {
  let { data: db_pessoas, error } = await supabase
    .from("db_pessoas")
    .select("*")
    .ilike("nome", `%${value}%`);

  if (error) {
    console.warn("Ocorreu um erro na busca por prestador\n", error.message);
    throw new Error(
      `Ocorreu um erro na busca por prestador - ${error.message}`
    );
  }

  //console.log(db_pessoas)
  return db_pessoas;
};

export const AtualizarDadosPrestadorService = async (prestador: IPrestador) => {
  const { data, error } = await supabase
    .from("db_pessoas")
    .update(prestador)
    .eq("id", prestador.id)
    .select();

  if (error) {
    console.log("ocorreu um erro na atualização\n", error);
  }
  console.log("dados atualizados\n", data);
};

export const uploadAvatarPerfil = async (avatar: File, name:string) => {
  let type = avatar.type.split("/")[1];

  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(`public/${name.trim()}.${type}`, avatar, {
      cacheControl: "3600",
      upsert: false,
    });

    if(error){
      console.warn('ocorre um erro', error)
    } 
    //console.log('Avatar enviado ', data);
    return data;
};
