import { Result } from "@/result";
import { Jwt, sign, verify } from "jsonwebtoken";
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set')
const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) throw new Error('JWT_SECRET not set')
export const signAuthToken = (email: string) => {
  const accessToken = sign({ email }, jwtSecret);
  return accessToken;
};

/**
 * Verifies the JWT and returns the decoded payload if valid.
 */
export const verifyAuthToken = (token: string): Result<Jwt> => {
  try {
    const decoded = verify(token, jwtSecret, {
      complete: true,
    });
    return { success: true, data: decoded as Jwt };
  } catch (error) {
    return { success: false, error: "Invalid or expired token" };
  }
};
//Homework: What is type narrowing in typescript??-Come up with 5 more questions through research