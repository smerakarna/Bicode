import { sign } from "jsonwebtoken";

export const signAuthToken = (email: string) => {
  const accessToken = sign({ email }, process.env.JWT_SECRET || "supersecret", {
    expiresIn: "1h",
  });
  return accessToken;
};
