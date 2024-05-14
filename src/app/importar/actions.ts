import { ChangeEvent } from "react"

/**
 * Faz a leitura de todas as linhas do arquivo
 * @param file ChangeEvent<HTMLInputElement> arquivo que foi selecionado
 */
export const readLinesOfFile = (file:ChangeEvent<HTMLInputElement>)=>{

    if(file){

        const arq = file.target.files![0];
        let reader = new FileReader();
        reader.onload = (evt)=>{
            let linha = evt.target?.result?.toString().split('\n')
            linha?.map((item)=>{
                console.log(`NOME: ${item.substring(53,123)} - PIS/PASEP: ${item.substring(32,43)}`) // NOME
            })
        }
        reader.readAsText(arq)

        
        
    }

}