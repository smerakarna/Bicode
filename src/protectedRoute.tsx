"use client";

import { FC } from "react";
import { useAuth } from "./auth";
import { redirect } from "next/navigation";

export const protectedRoute = <T extends object>(Component: FC<T>): FC<T> => {
  return function ProtectedRoute(props: T) {
    const [auth] = useAuth();

    if (!auth?.jwt) {
      return redirect("/");
    }

    return <Component {...props} />;
  };
};
