import { Freelance } from "@/interface/freelance";
import supabase from "@/lib/supabase";

/**
 * Esta função assincrona inclui um novo prestador de serviços na base de dados
 * @param freelance Um objeto Freelance contendo os dados do prestador a ser incluído.
 * @returns A função retorna uma promessa que resolve para um objeto
 * contendo os dados do prestador incluído, ou rejeita para um erro caso a inclusão falhe.
 */
export const incluirNovoPrestador = async (freelance: Freelance) => {
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

export const consultaPisPasep = async (freelance: Freelance) => {
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
