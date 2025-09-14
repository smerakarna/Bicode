import { NextRequest } from "next/server";
import { db } from '@/db/client'
import bcrypt from 'bcryptjs'

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

  // Get the user's current password (hash)
  const user = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.email, email)
  })
  // If there's no user, 401
  if (!user) {
    return new Response(
      JSON.stringify({ error: "The email/password combination was invalid." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    )
  }


  // Verify that the password is correct
  const { passwordHash } = user;
  const compareResult = bcrypt.compareSync(password, passwordHash)
  // If the password is wrong
  if (!compareResult) {
    return new Response(
      JSON.stringify({ error: "The email/password combination was invalid." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    )
  }

  // if everything goes okay, return a 200 response
  return new Response(
    JSON.stringify({
      message: "Login not implemented, but ok for now",
      email,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};