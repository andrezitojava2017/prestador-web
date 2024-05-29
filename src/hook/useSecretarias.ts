import { ISecretaria } from "@/interface/ISecretaria";
import { recuperarListaSecretarias } from "@/service/secretariaService";
import { useEffect, useState } from "react";

const useSecretaria =  () => {
  const [secretarias, setSecretarias] = useState<ISecretaria[]>([]);
  const [erro, setError] = useState<any>(null);

  useEffect(() => {
    const getSecretarias = async () => {
      try {
        const rs = await recuperarListaSecretarias();
        if (rs?.length !== 0) setSecretarias(rs!);
      } catch (error: any) {
        setError(error);
      }
    };

    getSecretarias();
  }, []);
  return { secretarias, erro };
};

export default useSecretaria