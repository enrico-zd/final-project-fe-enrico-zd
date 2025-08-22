import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        company_name: {
          label: "Company",
          type: "text",
          placeholder: "Enter company name",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company_name: credentials.company_name,
            username: credentials.username,
            password: credentials.password,
          })
        });

        if (!res.ok) {
          // Ambil pesan error dari backend
          const err = await res.json().catch(() => ({}));
          // throw Error → akan dikirim sebagai result.error di client
          throw new Error(err.message ?? "Invalid credentials");
        };
        const data = await res.json(); // get response login

        return {
          id: String(data.user.user_id),         // untuk NextAuth
          user_id: data.user.user_id,
          name: data.user.name,
          role: data.user.role,
          avatar: data.user.avatar,
          email: data.user.email,
          accessToken: data.tokens.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Login pertama → simpan token & exp
      if (user) {
        token.userId = user.id;
        token.user_id = user.user_id
        token.role = user.role;
        token.avatar = user.avatar;
        token.accessToken = user.accessToken;
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.user_id = token.user_id;
        session.user.role = token.role as string;
        session.user.avatar = token.avatar as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};