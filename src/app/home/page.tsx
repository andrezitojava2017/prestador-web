"use client"
import {
    Button, Stack, Text, FormControl,
    FormLabel,
    Select,
} from "@chakra-ui/react"
import useTributo from "@/hook/useTributo";
import { useContext, useEffect, useState } from "react";
import { TributoContext } from "@/context/tributoContext";

const HomePage = () => {

    const [disable, setDisalbe] = useState<boolean>(false);
    const { tributo, error } = useTributo()
    const { tributoRef, setTributoRef } = useContext(TributoContext)

    useEffect(() => {

        const desabilitarSelect = () => {
            if (tributoRef.competencia !== '') {
                setDisalbe(!disable)
            }
        }
        desabilitarSelect()

    }, [tributoRef])

    if (error) {
        return <p>Não foi possive carregar as config. de tributos</p>
    }


    const definirReferenciaTributos = (ref: string) => {

        const tribReferencial = tributo.filter((trib) => trib.competencia === ref)
        setTributoRef({
            competencia: tribReferencial[0].competencia,
            max_recolhimento: tribReferencial[0].max_recolhimento,
            base_patronal: tribReferencial[0].base_patronal,
            base_segurado: tribReferencial[0].base_segurado
        })

    }


    return (
        <Stack maxWidth={'30%'} border={'1px solid #157A8C'} borderRadius={12} padding={6}>

            <Stack>
                <FormControl>
                    <FormLabel>Defina uma competencia</FormLabel>
                    <Select
                        placeholder='Competencia'
                        onChangeCapture={(e) => definirReferenciaTributos(e.currentTarget.value)}
                        isDisabled={disable}
                    >
                        {
                            tributo.map((trib) => {
                                return <option key={trib.competencia} >{trib.competencia}</option>
                            })
                        }

                    </Select>
                </FormControl>


                <Button onClick={() => setDisalbe(!disable)}>
                    <Text>Alterar</Text>
                </Button>
                {


                    tributoRef.competencia !== '' || tributoRef.competencia ?
                        (<Text textAlign={'center'} color={'red'}>{`${tributoRef.competencia} selecionada`}</Text>)
                        : (<span>Nenhuma selecionada</span>)

                }

            </Stack>
        </Stack>
    )
}

export default HomePage;