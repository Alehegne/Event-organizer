import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";

declare module "next-auth" {
  /**
   * Extends the default Session type
   */

 
  interface Session {
    user: {
      id: string;
      userName: string;
      email: string;
      firstName?: string;
      lastName?: string;
    } & DefaultSession["user"];
  }

  interface Profile extends DefaultProfile {

    given_name?:string,
    family_name?:string,
    login?:string
    email?:string,
  }

  /**
   * Extends the default User type
   */
  interface User extends DefaultUser {
    id: string;
    userName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;

  }

  /**
   * Extends the default JWT type
   */
  interface JWT {
    id: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
  }

  /**
   * Makes sure AuthOptions type is available
   */
  export interface AuthOptions extends NextAuthOptions {
     secret: string;
  }
}
