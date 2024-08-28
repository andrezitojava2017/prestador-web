import { ISecretaria } from "@/interface/ISecretaria";
import supabase from "@/lib/supabase";
import { instance } from "@/utils/api/config";

export const adicionarNovaSecretaria = async (
  secretaria: ISecretaria,
  token: string
) => {
  instance.post(
    "/config/add",
    {
      descricao: secretaria.descricao,
      codigo: secretaria.codigo,
    },
    {
      headers: {
        authorization: `${token}`,
      },
    }
  );
  /*
  const { data, error } = await supabase
    .from("db_lotacao")
    .insert(secretaria)
    .select();

  if (error) {
    console.warn("Ocorreu um erro na gravação\n", error.message);
    throw new Error("Ocorreu um erro na gravação");
  }
  console.log(data);
  */
};

export const recuperarListaSecretarias = async (token:string) => {

  try {
    const rs = await instance.get('/config/lotation',{
      headers:{
        authorization: token
      }
    })

    return rs.data
  } catch (error) {
    console.warn('Erro ocorrido ', error);
    
    throw new Error(
      "Ocorreu um erro na tentativa de recuperar lista de Lotação/Secretaria"
    );
  }
  /*
  let { data: db_lotacao, error } = await supabase
    .from("db_lotacao")
    .select("*");

  if (error) {
    console.warn(
      "Ocorreu um erro na tentativa de recuperar lista de Lotação/Secretaria\n",
      error.message
    );
  }
    */
};
