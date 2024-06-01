import { ITributos } from '@/interface/ITributos';
import { recuperarListaTributoMensal } from '@/service/tributoService';
import { useEffect, useState } from 'react';

const useTributo = () => {
  const [tributo, setTributo] = useState<ITributos[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      const getTributos = async () => {
        const data = await recuperarListaTributoMensal();
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
