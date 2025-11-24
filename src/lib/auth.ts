import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        code: { label: 'Code', type: 'text' },
        mode: { label: 'Mode', type: 'text' }
      },
      async authorize(credentials) {
        const { email, password, mode } = credentials ?? {};

        if (!email || !mode) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) return null;

        if (mode === 'password') {
          if (!password) return null;

          const isValid = await compare(password, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          };
        }

        if (mode === 'code') {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};
