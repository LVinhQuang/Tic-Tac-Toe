"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const token = localStorage.getItem("token");

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = token;
    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}