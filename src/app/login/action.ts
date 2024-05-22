import { Credencial } from "@/interface/credencial";
import supabase from "@/lib/supabase";
import { logarUsuario } from "@/service/loginService";

export const createUser = async () => {
  let { data, error } = await supabase.auth.signUp({
    email: "andre_sjx@live.com",
    password: "159357",
  });

  if (error) {
    console.log(error);
  }

  console.log(data);
};

export const autenticarUsuario = async (usuario: Credencial) => {
  try {
    const rs = await logarUsuario(usuario);

    if (!rs) throw new Error("Não foi possivel logar com email e senha");

    return rs;
  } catch (error) {
    throw error;
  }
};

export const verificarCampos = (usuario: Credencial) => {
  if (
    usuario.email === null ||
    usuario.email === undefined ||
    usuario.email === ""
  ) {
    throw new Error("O campo E-mail não foi preenchido");
  }
  if (
    usuario.senha === null ||
    usuario.senha === undefined ||
    usuario.senha === ""
  ) {
    throw new Error("O campo Senha não foi preenchido");
  }
};
