import supabase from "@/lib/supabase";



export const sair = async () => {
  let { error } = await supabase.auth.signOut();

  if(error){
    console.log(error)
  }
};
