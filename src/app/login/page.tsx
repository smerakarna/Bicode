"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
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
      </main>
    </div>
  );
}
