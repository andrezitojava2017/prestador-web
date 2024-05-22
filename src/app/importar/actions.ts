import { Freelance } from "@/interface/freelance";
import { ChangeEvent } from "react";

/**
 * Faz a leitura de todas as linhas do arquivo
 * @param file ChangeEvent<HTMLInputElement> arquivo que foi selecionado
 */
export const readLinesOfFile = (file: ChangeEvent<HTMLInputElement>) : Promise<Freelance[]> => {
  return new Promise((resolve, reject) => {
    

    if(!file){
        reject(new Error('Arquivo não selecionado'))
        return;
    }
   
      const fileSelect = file.target.files![0];
      let reader = new FileReader();

      reader.onload = (evt) => {

        if(!evt.target?.result){
            reject(new Error("Falha na leitura do arquivo"))
            return;
        }

        let freelanceList: Freelance[] = [];
        let lines = evt.target?.result?.toString().split("\n");

        lines.forEach(el => {
            let freelance = {
                nome: el.substring(53, 123),
                pisPasep: el.substring(32, 43),
              };
              freelanceList.push(freelance);
        });

        resolve(freelanceList)
      
      };

      reader.onerror = () => {
        let error = new Error("Ocorreu um erro na leitura do arquivo!");
        reject(error);
      };

      reader.readAsText(fileSelect);
    
  });
};

/**
 * salva os dados recuperados do arquivo em localstorage
 * @param data 
 */
export const saveLocalStorage = (data:Freelance[])=>{

    localStorage.setItem('freelance',JSON.stringify(data))
}

/**
 * recupera todos os dados contidos no localstorage
 * @returns  Freelance[]
 */
export const getFreelanceStorage = ()=>{
    
    try {

        if(localStorage.getItem('freelance') !== null){
            return JSON.parse(localStorage.getItem('freelance')!) as Freelance[];
        }
    } catch (error) {
        console.log('ocorreu um erro:\n', error)
        throw error;
    }

    return [] ;
}