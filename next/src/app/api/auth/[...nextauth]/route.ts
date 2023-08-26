import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import { addUser } from "@/service/user";

const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_ID || "",
      clientSecret: process.env.GITHUB_OAUTH_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_OAUTH_ID || "",
      clientSecret: process.env.KAKAO_OAUTH_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_OAUTH_ID || "",
      clientSecret: process.env.NAVER_OAUTH_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }
      addUser({
        id: user.id.split("__")[0].split("-")[1] || user.id,
        name: user.name || "",
        email: user.email || "",
        image: user.image,
        username: user.email.split("@")[0],
      });
      return true;
    },
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          id: user.email?.split("@")[0] || "",
          id2: token.id as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
