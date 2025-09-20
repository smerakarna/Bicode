"use client";

import { useAuth } from "@/auth";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  if (auth.jwt) {
    redirect("/start");
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.target.name === "email") {
        setEmail(event.target.value);
      } else if (event.target.name === "password") {
        setPassword(event.target.value);
      }
    },
    []
  );

  const mutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      return response.json() as Promise<{ token: string }>;
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      mutation.mutate(
        { email, password },
        {
          onSuccess: (data) => {
            setAuth({ jwt: data.token });
          },
        }
      );
    },
    [email, password]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center">
      <main className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login Here</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="Password"
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
        <p>{mutation.isError && mutation.error.message}</p>
      </main>
    </div>
  );
}
