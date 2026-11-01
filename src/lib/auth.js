import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";


const uri = process.env.MONGODB_URI || "your-mongodb-uri";
const client = new MongoClient(uri);
const db = client.db("bookhaven");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: "https://my-assignment-08-sigma.vercel.app",
  secret: "N9MszhOBTv8Z4wT5FiRcSQGvGntAcNJd",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8, 
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