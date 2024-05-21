import supabase from "@/lib/supabase";

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

export const loginUser = async () => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: "andre_sjx@live.com",
    password: "159357",
  });
  
  if (error) {
    console.log(error);
    throw new Error('Ocorreu um erro na autenticação\n', error)
    
  }

  return data
};
