import { IPrestador } from "@/interface/IPrestador";

/**
 * recupera todos os dados contidos no localstorage
 * @returns  Freelance[]
 */
export const getFreelanceStorage = ()=>{
    
    try {

        if(localStorage.getItem('freelance') !== null){
            return JSON.parse(localStorage.getItem('freelance')!) as IPrestador[];
        }
    } catch (error) {
        console.log('ocorreu um erro:\n', error)
        throw error;
    }

    return [] ;
}