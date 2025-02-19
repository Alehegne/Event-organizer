import {compare} from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "../mongoDb/database/model/user.model"; // ✅ Import the User model
import { connnectToDatabase } from "../mongoDb/database"; // ✅ Import the database connection
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"; // ✅ Import the MongoDB adapter
import client from "../mongoDb/database/db";
import Credentials from "next-auth/providers/credentials";
import { createUser } from "../actions/user.actions";
import { CreateUserParams } from "@/types";
import { NextAuthOptions } from "next-auth";

//profile types





export const authOptions:NextAuthOptions = {
    adapter: MongoDBAdapter(client), // ✅ Use the MongoDB adapter
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/logIn",

  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile){
        
        return{
          id: profile.sub,
          name: profile.name || `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          provider: 'google', // Set provider
          firstName: profile.given_name,
          lastName: profile.family_name,
          userName: profile.email.split('@')[0], // Generate username from email
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        const nameParts = profile.name?.split(' ') || [];
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          provider: 'github', // Set provider
          firstName: nameParts[0] || profile.login,
          lastName: nameParts.slice(1).join(' ') || '',
          userName: profile.login, // Use GitHub login as username
        };
      },
     
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // console.log("🔵 Authorizing:", credentials);
        if (!credentials?.email || !credentials?.password){
          // console.log("❌ Missing credentials");
          return null;
        }

        
        await connnectToDatabase();
      
       const existingUser =await User.findOne({ email: credentials.email });

       
        if (!existingUser) {
          // console.log("❌ User not found in database");
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) {
          // console.log("❌ Password does not match");
          return null;
        }
        // console.log("existingUser",existingUser)

        // console.log("✅ User authenticated:", {
        //   id: existingUser._id,
        //   userName: existingUser.userName,
        //   email: existingUser.email,
        //   lastName: existingUser.lastName,
        //   firstName: existingUser.firstName,

        // });

        return {
          id: existingUser._id,
          userName: existingUser.userName, // ✅ Ensure username is returned
          email: existingUser.email,
          lastName: existingUser.lastName,
          firstName: existingUser.firstName,
         
        };
      },
    }),
  ],

 
  callbacks: {

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    async signIn({ user, account, profile }) {

      // console.log("signing in....")
      // console.log("User object from signIn:", user);
      // console.log("Account data:", account);
      // console.log("Profile data:", profile);
      
      //check the provider
      await connnectToDatabase();

      if(account?.provider === "google" || account?.provider === "github"){
        //check if the user is already in the database
        // console.log("working inside")
       

        const existingUser = await User.findOne({ email: user.email });


        if (!existingUser) {
         
          const data:CreateUserParams = {
            email: profile?.email as string,
            photo: profile?.image as string,
            provider: account?.provider, // Set provider
            firstName: account.provider === "google" ? profile?.given_name : profile?.login,
            lastName: profile?.family_name,
            userName: (profile?.email as string).split('@')[0] || profile?.login , // Generate username from email
            password:''

          }
         await createUser(data)

          // console.log("✅ New user created using third party:", {
          //   userName: newUser.userName,
          //   email: newUser.email,
          //   lastName: newUser.lastName,
          //   firstName: newUser.firstName,
          //   imageUrl: newUser.photo,
          //   provider:newUser.provider,
          // });
          //add the id to the user for session id access
          // console.log("user befor:",user);

        }else{
          // console.log("user befor:",user);

        }

        return true;

      }

      return true;
    },


    async jwt({token,user}) {
      // console.log("🟡 JWT Callback - Before:", token);
      
      if (user) {
        // console.log("setting tokense")
        token.id = user.id;
        token.email = user.email!;
        token.userName = user.userName!;
        token.firstName = user.firstName!;
        token.lastName = user.lastName!
      }else{
        // console.log("user is undefined")
      }

      // console.log("🟢 JWT Callback - After:", token);
      return token;
    },
    async session({ session, token }) {
      // console.log("🟡 Session Callback - Before:", session);
      // console.log("🔵 Token:", token);

      session.user.id = token.id as string;
      session.user.email = token.email!;
      session.user.userName = token.userName! as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;

  

      // console.log("🟢 Session Callback - After:", session);
      return session;
    },
  },
};

