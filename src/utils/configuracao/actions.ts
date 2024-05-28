"use client"
export const validarCompetencia = (value:string)=>{

    const regex = /^\d{2}\/\d{4}$/;
    const validado = regex.test(value)
    return validado;    
}
