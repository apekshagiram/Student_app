"use client";

import { useTransition } from "react";
import { joinClub, leaveClub } from "@/lib/actions/clubs";

export default function JoinClubButton({ club }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      try {
        if (club.joined) {
          await leaveClub(club.id);
        } else {
          await joinClub(club.id);
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`w-full mt-5 py-2 rounded-lg font-medium transition ${
        club.joined
          ? "bg-green-600 text-white"
          : "bg-white text-black"
      }`}
    >
     {isPending
  ? "Please wait..."
  : club.joined
  ? "✓ Joined"
  : "+ Join Club"}
    </button>
  );
}