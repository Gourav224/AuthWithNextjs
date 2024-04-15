"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [token, settoken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setverified(true);
      seterror(false);
    } catch (error: any) {
      seterror(true);
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    seterror(false)
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    settoken(urlToken || "");
  }, []);
  useEffect(() => {
    seterror(false)
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="mt-4 p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="mt-4 text-2xl">Email Verified</h2>
          <Link href="/login" className="text-center  mt-4">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="mt-4 text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
