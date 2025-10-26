import { signAuthToken } from "@/auth/jwt";
import { findUsers, insertUser } from "@/db/sdk";
import { connect } from "@/db/client";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { db } = await connect();
  // get the email and password from the request
  const { email, password } = await request.json();

  //if there's no email or password return a 400 response
  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Check if the email is already in the database
  // First get the user from the database
  const [userMaybe] = await findUsers(db, { email });

  // If the user exists, return a 409 status code
  if (userMaybe) {
    return new Response(
      JSON.stringify({ error: "Email already exists: " + userMaybe.email }),
      { status: 409, headers: { "Content-Type": "application/json" } }
    );
  }

  // hash the password to protect against password leaks
  const hash = bcrypt.hashSync(password, 10);
  console.log("Registering user:", { email });
  // insert the user into the database
  await insertUser(db, { email, passwordHash: hash });

  // if everything goes okay, return a 200 response
  const accessToken = signAuthToken(email);
  return new Response(
    JSON.stringify({
      message: "Registration not implemented, but ok for now",
      email,
      token: accessToken,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
