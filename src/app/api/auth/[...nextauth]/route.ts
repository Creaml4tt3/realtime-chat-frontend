import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateWithPassport } from "./passportAdapter";

export const authOptions = {
  pages: {
    // signIn: "/auth/login",
    // signOut: "/auth/logout",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        const userData = await authenticateWithPassport(credentials);
        const user = userData?.user;
        const access_token = userData?.accessToken;
        const data = { ...user, access_token };

        delete data.password;
        delete data.deleted;

        if (data) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user;
        return session;
      }
    },
    async redirect({ url, baseUrl }: any) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    maxAge: 3 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
