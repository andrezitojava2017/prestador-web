import { Credencial } from "@/interface/credencial";
import supabase from "@/lib/supabase";

export const logarUsuario = async (usuario: Credencial) => {

   let { data, error } = await supabase.auth.signInWithPassword({
    email: usuario.email!,
    password: usuario.senha!,
  });

  if (error) {
    console.log(error.message);
    throw new Error(`Ocorreu um erro na autenticação: ${error.message}`);
  }

  return data;
};

export const desconectarUsuario = async () => {

  try {
    let { error } = await supabase.auth.signOut();
    if (error) throw error;

  } catch (error) {
    console.warn(`Ocorreu um erro ao deslogar\n ${error}`);
  }
};

export const novoUsuario = async (user: Credencial) => {
  const { data, error } = await supabase.auth.signUp({
    email: user.email!,
    password: user.senha!,
    options: {
      data: {
        nome: user.nome,
        avatar: user.avatar,
      },
    },
  });

  if (error) {
    console.warn(error);
    throw new Error("Ocorreu um erro na tentaiva de inserir usuario");
  }
};

export const getInfoUsuario = async () => {
  let infoUser: Credencial | any = { nome: "", email: "", avatar: "" };
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      infoUser.email = user.email;
      infoUser.nome = user.user_metadata.nome;
      infoUser.avatar = user.user_metadata.avatar;
    }
    
    return infoUser;
  } catch (error) {
    console.warn(error);

    throw new Error(
      "Ocorreu um erro na tentativa de recuperar dados de usuario logado"
    );
  }
};

export const updateInfoUsuario = async (path: any) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { avatar: path.path },
  });

  if (error) {
    console.warn("erro ao atualizar avatar usuario ", error);
    throw new Error("Erro ao tentar atualizar dados de usuario");
  }

  console.log("imagem atualizada ", data);
};

export const getImageAvatar = async (path: string) => {
  
  const { data } = supabase.storage
    .from("avatar")
    .getPublicUrl(path)
 

  //console.log(data);
  return data;
};
