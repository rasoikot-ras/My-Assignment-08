import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://BookHaven:181267@ras.k85l7li.mongodb.net/bookhaven?retryWrites=true&w=majority&appName=RAS";

const client = new MongoClient(uri);
const db = client.db("BookHaven");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "https://my-assignment-08-49n1o79pe-ra-soikot-s-projects.vercel.app",
  secret: process.env.BETTER_AUTH_SECRET || "N9MszhOBTv8Z4wT5FiRcSQGvGntAcNJd",

  
  trustedOrigins: [
    "https://my-assignment-08-49n1o79pe-ra-soikot-s-projects.vercel.app",
    "http://localhost:3000",
    (origin) => origin.endsWith(".vercel.app")
  ],

  database: mongodbAdapter(db, {
    client
  }),
  
  emailAndPassword: {
    enabled: true
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }
  }
});