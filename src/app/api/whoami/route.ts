import { verifyAuthToken } from "@/auth/jwt";
import { db } from "@/db/client";
import { findUsers } from "@/db/sdk";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  // Typically, whoami endpoints check the request's authorization header
  // for a JWT or session cookie to identify the user.

  // Steps include:
  // 1. Extract the token from the Authorization header.
  // 2. Verify the token's validity and decode it.
  // 3. Fetch user details from the database using info from the token.
  // 4. Return user details in the response.

  // 1. Extract the token from the Authorization header
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Authorization header missing or malformed" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const token = authHeader.split(" ")[1];

  // 2. Verify the token's validity and decode it
  // Use import { verifyAuthToken } from "@/auth/jwt"; at the top
  const verifyResult = verifyAuthToken(token);
  if (!verifyResult.success) {
    return new Response(JSON.stringify({ error: verifyResult.error }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const decoded = verifyResult.data;

  // Ensure the payload has the expected structure
  const { payload } = decoded;
  if (typeof payload === "string" || !payload.email) {
    return new Response(JSON.stringify({ error: "Invalid token payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 3. Fetch user details from the database using info from the token
  const { email } = payload;
  const [user] = await findUsers(db, { email });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 4. Return user details in the response
  const { passwordHash, ...userWithoutPassword } = user; // Exclude sensitive info
  return new Response(JSON.stringify({ user: userWithoutPassword }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
