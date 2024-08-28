import { ISecretaria } from "@/interface/ISecretaria";
import { recuperarListaSecretarias } from "@/service/secretariaService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useSecretaria =  () => {
  const [secretarias, setSecretarias] = useState<ISecretaria[]>([]);
  const [erro, setError] = useState<any>(null);
  const {data:session} = useSession()

  useEffect(() => {
    const getSecretarias = async () => {
      try {
        const rs = await recuperarListaSecretarias(session!.user.access_token);
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