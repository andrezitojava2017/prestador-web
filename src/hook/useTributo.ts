import { ITributos } from '@/interface/ITributos';
import { recuperarListaTributoMensal } from '@/service/tributoService';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const useTributo = () => {
  const [tributo, setTributo] = useState<ITributos[]>([]);
  const [error, setError] = useState<boolean>(false);
  const {data:session} = useSession();

  useEffect(() => {
    try {
      const getTributos = async () => {
        if(!session) {
          setTributo([])
        }
        const data = await recuperarListaTributoMensal(session!.user.token);
        if (data) setTributo(data!);
        
      };

      getTributos();
    } catch (error: any) {
      setError(true);
    }
  }, []);

  return { tributo, setTributo, error };
};

export default useTributo;
