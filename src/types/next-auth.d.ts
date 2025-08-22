// Extends the built-in NextAuth types
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
        user_id?: number;
        role?: string;
        avatar?: string;
        accessToken?: string;
    } & DefaultSession["user"];
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    id?: string;
    user_id?: number;
    role?: string;
    avatar?: string;
    email?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
    /**
     * Extend the built-in JWT types
     */
    interface JWT {
        userId?: string;
        user_id?: number;
        role?: string;
        accessToken?: string;
    }
}