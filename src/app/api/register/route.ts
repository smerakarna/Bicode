import { db } from "@/db/client";
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

  console.log("Registering user:", { email });
  db
  .insert(db._.fullSchema.usersTable).values({
    email,
  })
    // if everything goes okay, return a 200 response
  return new Response(
    JSON.stringify({
      message: "Registration not implemented, but ok for now",
      email,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
