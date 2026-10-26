import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI to your environment variables.");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const auth = betterAuth({
  database: mongodbAdapter(clientPromise),
  baseURL: process.env.BETTER_AUTH_URL || "https://my-assignment-08-49n1o79pe-ra-soikot-s-projects.vercel.app",
  secret: process.env.BETTER_AUTH_SECRET || "N9MszhOBTv8Z4wT5FiRcSQGvGntAcNJd",
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