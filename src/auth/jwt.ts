import { Result } from "@/result";
import { Jwt, sign, verify } from "jsonwebtoken";

export const signAuthToken = (email: string) => {
  const accessToken = sign({ email }, process.env.JWT_SECRET || "supersecret");
  return accessToken;
};

/**
 * Verifies the JWT and returns the decoded payload if valid.
 */
export const verifyAuthToken = (token: string): Result<Jwt> => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET || "supersecret", {
      complete: true,
    });
    return { success: true, data: decoded as Jwt };
  } catch (error) {
    return { success: false, error: "Invalid or expired token" };
  }
};
