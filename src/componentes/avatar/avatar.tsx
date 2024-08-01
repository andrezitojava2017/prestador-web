"use client";
import {
  getImageAvatar,
  getInfoUsuario,
  updateInfoUsuario,
} from "@/service/loginService";
import { uploadAvatarPerfil } from "@/service/prestadorService";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Avatar,
  Input,
} from "@chakra-ui/react";
import React, { FormEvent, useEffect, useState } from "react";
import { Credencial } from "../../interface/credencial";
import icon from "../../assets/icon.png";
import Image from "next/image";

const Perfil = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();
  const [image, setImage] = useState<string>("");
  const [user, setUser] = useState<Credencial>({
    nome: "",
    email: "",
    avatar: icon.src,
  });

  useEffect(() => {
    (async () => {
      try {
        const rs = await getInfoUsuario();
        if (rs) {
          let url = await getImageAvatar(rs.avatar);
          setImage(url.publicUrl);
          setUser({ ...rs });
        }
      } catch (error) {
        console.warn("ocorreu um erro ", error);
      }
    })();
  }, []);

  const uploadAvatar = async (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      let file = e.currentTarget.files[0];
      const rs = await uploadAvatarPerfil(file, user.nome!);

      if (rs) updateInfoUsuario(rs);
    }
  };

  return (
    <>
      <Avatar
        /* name={user?.nome || 'Prestador Web'}*/
        icon={<Image src={icon} width={50} height={50} alt={"icone"} />}
        size={"xl"}
        background={"white"}
        src={image ? image : icon.src}
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
                <Input type="file" onChangeCapture={(e) => uploadAvatar(e)} />
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
