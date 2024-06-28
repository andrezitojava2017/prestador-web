import { IPrestador } from "@/interface/IPrestador";
import { getFreelanceStorage } from "@/utils/storage/storage";
import { useToast } from "@chakra-ui/react";
import { ReactNode, createContext, useEffect, useState } from "react";

export const FreelanceContexts = createContext<any | undefined>(undefined);

export const FreelanceProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const [freelancers, setFreelancers] = useState<IPrestador>();

  const [freelanceStorage, setFreelanceStorage] = useState<IPrestador[]>([]);

  const removeFreelanceStorage = () => {
    const storage = getFreelanceStorage();

    const freeList = storage.filter((free) => {
      return free.pisPasep !== freelancers!.pisPasep;
    });

    localStorage.setItem("freelance", JSON.stringify(freeList));
    setFreelanceStorage({ ...freeList });
  };


  useEffect(() => {
    if (freelanceStorage) {
      try {
        let free = getFreelanceStorage();
        if (free.length !== 0) {
          setFreelanceStorage(free);
        }
      } catch (error) {
        toast({
          title: "Tivemos um problema",
          description: "Ocorreu um erro interno na aplicação",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, []);

  return (
    <FreelanceContexts.Provider
      value={{
        setFreelancers,
        freelancers,
        freelanceStorage,
        setFreelanceStorage,
        removeFreelanceStorage,
      }}
    >
      {children}
    </FreelanceContexts.Provider>
  );
};
