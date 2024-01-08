"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
const label = { inputProps: { "aria-label": "Switch demo" } };
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { getUserState } from "@/store/userSlice";

export default function Home() {
  const route = useRouter();
  const user = useAppSelector(getUserState);
  useEffect(() => {
    console.log(user);
    if (!user?.loggedIn == true) {
      route.push("/login");
    } else {
      route.push("/feed");
    }
  }, []);
  return <div className="container"></div>;
}
