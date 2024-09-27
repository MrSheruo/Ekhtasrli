import { VerifiedUser } from "@/types";
import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET; // Make sure this environment variable is set
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  return jwt.verify(token, secret) as VerifiedUser;
};
