"use client";

import Link from "next/link";

export default function Welcometopage() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-4">
      <p className="text-gray-600">Click below to continue</p>

      <Link
        href="/LoginSignup"
        className="inline-block px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        Continue
      </Link>
    </div>
  );
}


