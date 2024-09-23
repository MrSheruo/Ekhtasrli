import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const secret = process.env.JWT_SECRET; // Make sure this environment variable is set
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  return jwt.sign(user, secret, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET; // Make sure this environment variable is set
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  return jwt.verify(token, secret);
};
