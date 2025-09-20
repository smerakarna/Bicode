import { signAuthToken } from "@/auth/jwt";
import { db } from "@/db/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
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
  const userMaybe = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  // If the user exists, return a 409 sstatus code
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
  await db.insert(db._.fullSchema.usersTable).values({
    email,
    passwordHash: hash,
  });

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
