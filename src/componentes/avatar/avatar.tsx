'use client'
import { uploadAvatarPerfil } from "@/service/prestadorService";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
  Avatar,
  Input,
} from "@chakra-ui/react";
import React, { FormEvent, RefObject } from "react";

const Perfil = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  const uploadAvatar = async (e:FormEvent<HTMLInputElement>)=>{

    if(e.currentTarget.files){
        let file = e.currentTarget.files[0]
        uploadAvatarPerfil(file)
    }
  }

  return (
    <>
      <Avatar
        name="Jederson Andre"
        width={100}
        height={100}
        background={"white"}
        onClick={onOpen}
        _hover={{ cursor: "pointer" }}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Perfil
            </AlertDialogHeader>

            <AlertDialogBody>
              Selecione uma imagem do arquivo
              <div>
                <Input
                  type="file"
                  onChangeCapture={(e)=>uploadAvatar(e)}
                />
              </div>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                SAIR
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Perfil;
