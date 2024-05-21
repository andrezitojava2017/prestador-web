'use client';

import { Button, Stack, Text } from "@chakra-ui/react"
import { sair } from "./actions"

const HomePage = ()=>{


    const deslogar = async ()=>{
        await sair()
    }

    return(
        <Stack>

            <Button onClick={()=> deslogar()}>
                <Text>deslogar</Text>
            </Button>
        </Stack>
    )
}

export default HomePage;