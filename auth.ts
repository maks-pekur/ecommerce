import NextAuth, { type DefaultSession } from "next-auth";
import "next-auth/jwt";

import authConfig from "./auth.config";

import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { env } from "./src/env";

const DEFAULT_ROLE: UserRole = UserRole.Customer;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      name: string;
      image?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    name: string;
    email: string;
    picture?: string;
  }
}

async function sessionCallback({ session, token }: any) {
  if (session.user && token) {
    session.user.id = token.sub || "";
    session.user.email = token.email || "";
    session.user.role = token.role || DEFAULT_ROLE;
    session.user.name = token.name || "";
    session.user.image = token.picture || "";
  }
  return session;
}

async function jwtCallback({ token }: any) {
  if (!token.sub) return token;

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: token.sub },
      select: { id: true, name: true, email: true, image: true, role: true },
    });

    if (dbUser) {
      token.id = dbUser.id;
      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image || "";
      token.role = dbUser.role || DEFAULT_ROLE;
    }
  } catch (error) {
    console.error("JWT Callback Error:", error);
  }

  return token;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: env.AUTH_SECRET,
  debug: !(env.NODE_ENV === "production"),
  session: { strategy: "jwt" },
  callbacks: {
    session: sessionCallback,
    jwt: jwtCallback,
  },
  ...authConfig,
});
