import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://BookHaven:181267@ras.k85l7li.mongodb.net/bookhaven?retryWrites=true&w=majority&appName=RAS";

let client = new MongoClient(uri);
let clientPromise = client.connect();

export const auth = betterAuth({
  database: mongodbAdapter(clientPromise),
  baseURL: process.env.BETTER_AUTH_URL || "https://my-assignment-08-49n1o79pe-ra-soikot-s-projects.vercel.app",
  secret: process.env.BETTER_AUTH_SECRET || "N9MszhOBTv8Z4wT5FiRcSQGvGntAcNJd",
  
  
  trustedOrigins: [
    "https://my-assignment-08-49n1o79pe-ra-soikot-s-projects.vercel.app",
    "https://my-assignment-08-git-main-ra-soikot-s-projects.vercel.app",
    "http://localhost:3000"
  ],

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});