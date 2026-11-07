import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "your-mongodb-uri";
const client = new MongoClient(uri);
const db = client.db("bookhaven");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: "https://my-assignment-08-sigma.vercel.app",
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8, 
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },
});