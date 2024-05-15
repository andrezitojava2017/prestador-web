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
                "pis-pasep": el.substring(32, 43),
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
