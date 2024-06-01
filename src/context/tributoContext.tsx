
import { ITributos } from '@/interface/ITributos';
import { ReactNode, createContext, useState } from 'react';

export const TributoContext = createContext<any | undefined>(undefined);

export const TributoProvider = ({ children }: { children: ReactNode }) => {
  const [tributoRef, setTributoRef] = useState<ITributos>({ competencia: '', max_recolhimento: 0, patronal: 0 });

  return (
    <TributoContext.Provider
      value={{ setTributoRef, tributoRef }}>
      {children}
    </TributoContext.Provider>
  );
};
