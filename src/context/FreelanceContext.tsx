import { Freelance } from "@/interface/freelance";
import { ReactNode, createContext, useState } from "react";

export const FreelanceContexts = createContext<any | undefined>(undefined);

export const FreelanceProvider = ({ children }: { children: ReactNode }) => {
  const [freelancers, setFreelancers] = useState<Freelance>();

  return (
    <FreelanceContexts.Provider value={{setFreelancers, freelancers}} >
      {children}
    </FreelanceContexts.Provider>
  );
};
