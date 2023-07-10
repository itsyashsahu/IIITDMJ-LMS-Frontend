import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Identifier",
          type: "text",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const {
          identifier,
          password,
        }: { identifier: string; password: string } | undefined = credentials;

        const url = `${process.env.BACKEND_URL}/api/auth/local`;

        const res = await axios.post(url, {
          identifier,
          password,
        });
        const user = await res.data;

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    // Set the desired session timeout time (in seconds)
    maxAge: 3600 * 24 * 30, // 30 days
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // eslint-disable-next-line no-param-reassign
      session.user = token as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
