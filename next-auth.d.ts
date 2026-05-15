// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    access_token: string;
    token: string;
  }

  interface Session {
    user: {
      access_token: string;
      token: string;
    };
  }

  interface JWT {
    access_token: string;
  }
}
