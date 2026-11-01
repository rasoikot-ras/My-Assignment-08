import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

let uri = process.env.MONGODB_URI;

if (!uri || typeof uri !== "string" || !uri.startsWith("mongodb")) {
  uri = "mongodb+srv://BookHaven:181267@ras.k85l7li.mongodb.net/bookhaven?retryWrites=true&w=majority&appName=RAS";
} else {
  uri = uri.replace(/^["'](.+)["']$/, '$1').trim();
}

const client = new MongoClient(uri);
const db = client.db("BookHaven");

export const auth = betterAuth({
  
  baseURL: process.env.BETTER_AUTH_URL || "https://my-assignment-08-sigma.vercel.app",
  secret: process.env.BETTER_AUTH_SECRET || "N9MszhOBTv8Z4wT5FiRcSQGvGntAcNJd",

  trustedOrigins: [
    "https://my-assignment-08-sigma.vercel.app",
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