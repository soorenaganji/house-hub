// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import { verifyPassword } from "@/app/utils/auth";
import connectDB from "@/app/utils/connectDB";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log(password);

        try {
          await connectDB();
        } catch (err) {
          throw new Error("There is a problem in the server");
        }

        if (!email || !password) {
          throw new Error("Please insert valid data");
        }

        const user = await User.findOne({ email: email });

        console.log(user);

        if (!user) {
          throw new Error("Please Signup First");
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
          throw new Error("Email or Password incorrect");
        }

        return { id: user._id, email: user.email };
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      // Assuming user.name exists and is fetched during sign-in
      session.user.name = user.name || session.user.email.split("@")[0]; // Fallback to email prefix if name doesn't exist
      return session;
    },
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add your own secret key here
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
