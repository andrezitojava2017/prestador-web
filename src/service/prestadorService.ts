import { IPesquisa } from "@/interface/IPesquisa";
import { IPrestador } from "@/interface/IPrestador";
import supabase from "@/lib/supabase";
import { instance } from "@/utils/api/config";
import { warn } from "console";

/**
 * Esta função assincrona inclui um novo prestador de serviços na base de dados
 * @param freelance Um objeto Freelance contendo os dados do prestador a ser incluído.
 * @returns A função retorna uma promessa que resolve para um objeto
 * contendo os dados do prestador incluído, ou rejeita para um erro caso a inclusão falhe.
 */
export const incluirNovoPrestador = async (
  freelance: IPrestador,
  token: string
) => {
  try {
    const rs = await instance.post(
      "/freelance/new",
      {
        ...freelance,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    return rs.data;
  } catch (error: any) {
    if (error.response.status === 401 && error.response.data.data) {
      let message = error.response.data.message;
      let freelance = error.response.data.data[0].nome;
      throw new Error(`${message}: ${freelance}`);
    }
    throw error;
  }
  /*
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
*/
};

export const consultaPisPasep = async (freelance: IPrestador) => {
  let { data: db_pessoas, error } = await supabase
    .from("db_pessoas")
    .select("*")
    .eq("pisPasep", freelance.pis_pasep);

  if (error) {
    console.log(
      "ocorreu um erro ao tentar verificar pispasep na base de dados\n",
      error
    );
    throw new Error("Erro ao tentar consultar PIS/PASEP na base de dados");
  }

  return db_pessoas;
};

export const buscarPrestador = async (value: string, token: string) => {
  try {
    const rs = await instance.get(`/freelance/list/${value}`, {
      headers: {
        authorization: token,
      },
    });

    return rs.data;
  } catch (error) {
    throw error;
  }
  /*
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
  */
};

export const AtualizarDadosPrestadorService = async (
  prestador: IPrestador,
  token: string
) => {
  try {
    const rs = await instance.put(
      "/freelance/update/",
      {
        ...prestador,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    return rs;

  } catch (error: any) {
    console.warn("Erro ao tentar atualizar prestador ", error.message);
    throw new Error("Não foi possivel atualizar o prestador");
  }

};

export const uploadAvatarPerfil = async (avatar: File, name: string) => {
  let type = avatar.type.split("/")[1];

  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(`public/${name.trim()}.${type}`, avatar, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.warn("ocorre um erro", error);
  }
  //console.log('Avatar enviado ', data);
  return data;
};
