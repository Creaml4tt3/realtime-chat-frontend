import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authenticateWithPassport } from "./passportAdapter";

export const authOptions = {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
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
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (user) {
        token.user = user;
      }
      if (account && account.provider === "google" && profile && profile.user) {
        token.user = profile.user;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        if (token.user.image) {
          token.user.photo = token.user.image;
          delete token.user.image;
        }
        session.user = token.user;
        return session;
      }
    },
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        if (profile.email_verified) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/auth/google`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(profile),
              }
            );

            const data = await response.json();
            profile.user = data?.user;
            return true;
          } catch (error) {
            console.error("Error authenticating with Google:", error);
            return null;
          }
        }
      }
      return true;
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
