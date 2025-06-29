// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const admins = [
          {
            name: "Sharon Mugure",
            email: "sharon.mugure@strathmore.edu",
            password: "sharonpassword", // replace with strong secret
            role: "admin",
          },
          {
            name: "Jamie Kibanya",
            email: "jamie.kibanya@strathmore.edu",
            password: "jamiepassword", // replace with strong secret
            role: "admin",
          },
        ];

        const user = admins.find(
          (admin) =>
            admin.email === credentials.email &&
            admin.password === credentials.password
        );

        if (user) {
          return {
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role || "user";
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
