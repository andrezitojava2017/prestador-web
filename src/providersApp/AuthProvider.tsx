import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redireciona para a página de login
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Exibe um carregamento enquanto verifica a sessão
  }

  // Renderiza o conteúdo apenas quando o usuário está autenticado
  return <>{status === "authenticated" && children}</>;
};

export default AuthProvider;
