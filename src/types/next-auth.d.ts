import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "CUSTOMER";
      fullName?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "ADMIN" | "CUSTOMER";
    fullName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "CUSTOMER";
    fullName?: string;
  }
}
