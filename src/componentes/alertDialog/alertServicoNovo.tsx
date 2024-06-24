"use client";
import { FreelanceContexts } from "@/context/FreelanceContext";
import { IServico } from "@/interface/IServico";
import { getFreelanceStorage } from "@/utils/storage/storage";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useContext } from "react";

type Props = {
  open: () => void;
  isOpen: boolean;
  close: () => void;
  message?: string;
  title?: string;
  service: React.Dispatch<React.SetStateAction<IServico>>;
  disableBtn: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertServicoNovo = ({
  open,
  isOpen,
  close,
  message,
  title,
  service,
  disableBtn,
}: Props) => {
  const cancelRef = React.useRef<any>();
  const { freelancers, setFreelancers, removeFreelanceStorage } =
    useContext(FreelanceContexts);

  const limparCampoServico = () => {
    service({
      empenho: 0,
      fonte: 0,
      inss_patronal: 0,
      inss_retido: 0,
      salario_base: "",
      cod_lotacao: 0,
    });
    close();
  };

  const removerPrestadorListaStorage = () => {
    try {
      const storage = getFreelanceStorage();

      const freeList = storage.filter((free) => {
        return free.pisPasep !== freelancers.pisPasep;
      });

      localStorage.setItem("freelance", JSON.stringify(freeList));
      close();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={close}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title || "Prestador Web"}
          </AlertDialogHeader>

          <AlertDialogBody>{message || "Mensagem de alerta"}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                disableBtn(true);
                removeFreelanceStorage();
                limparCampoServico();
              }}
            >
              Não
            </Button>
            <Button colorScheme="cyan" onClick={limparCampoServico} ml={3}>
              Sim, inserir outro
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertServicoNovo;
