"use client";

import { redirect } from "next/navigation";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  console.log("Auth state:", auth);
  if (auth.jwt) {
    redirect("/start");
  }

  // onChange is called when either input calls its onChange, which is when the user types into the search bar
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      // Based on which input it is, change that part of the component's state
      if (event.target.name === "email") {
        setEmail(event.target.value);
      } else if (event.target.name === "password") {
        setPassword(event.target.value);
      }
    },
    // Empty dependency array because this callback will never change
    []
  );

  // A mutation is when you change the state of the application
  const mutation = useMutation({
    // This mutationFn takes in 1 param, "data" of type {email: string, password: string}
    mutationFn: async (data: { email: string; password: string }) => {
      // Fetch /api/register with the data to create the user
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      // If the response was not ok, throw an error
      if (!response.ok) throw new Error("Failed to register user");
      return response.json() as Promise<{ token: string }>;
    },
  });

  // onSubmit is called when the <form> element calls onSubmit, which is when the user clicks the submit button
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      // Prevent refreshing of the page
      event.preventDefault();
      // Trigger the registration mutation
      mutation.mutate(
        { email, password },
        {
          onSuccess: (data) => {
            setAuth({ jwt: data.token });
          },
        }
      );

      // Dependency array for useCallback()
    },
    [email, password, mutation]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center">
      <main className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Register Here</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="Make Password"
            type="password"
            name="password"
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        <p>{mutation.isError && <p>{mutation.error.message}</p>}</p>
      </main>
    </div>
  );
}
//homework copypaste code into chatgpt and ask it to add comments
