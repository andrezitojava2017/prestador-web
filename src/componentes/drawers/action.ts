import { Freelance } from "@/interface/freelance";
import { AtualizarDadosPrestadorService } from "@/service/prestadorService";

export const AtualizarDadosPrestador =  async(data : Freelance)=>{

    await AtualizarDadosPrestadorService(data)
}