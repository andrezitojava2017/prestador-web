import { Credencial } from "@/interface/credencial";
import supabase from "@/lib/supabase";
import { AuthApiError, AuthError } from "@supabase/supabase-js";

export const logarUsuario = async (usuario: Credencial) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: usuario.email,
    password: usuario.senha,
  });

  if (error) {
    console.log(error.message);
    throw new Error(`Ocorreu um erro na autenticação: ${error.message}`);
  }

  return data;
};
