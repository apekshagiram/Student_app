"use client";

import { useTransition } from "react";

import JoinClubButton from "./JoinClubButton";
import { deleteClub } from "@/lib/actions/clubs";
import EditClubDialog from "./EditClubDialog";

export default function ClubCard({ club, currentUserId }) {
  const [isPending, startTransition] = useTransition();

  const categoryIcons = {
    Technology: "💻",
    Sports: "⚽",
    Cultural: "🎭",
    Arts: "🎨",
    Academic: "📚",
    Music: "🎵",
    Other: "⭐",
  };

  const isOwner = club.user_id === currentUserId;

  function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this club?"
    );

    if (!confirmDelete) return;

    startTransition(async () => {
      try {
        await deleteClub(club.id);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">

      <h2 className="text-lg font-semibold text-white">
        {club.name}
      </h2>

      <p className="text-zinc-400 mt-3 whitespace-pre-wrap">
        {club.description}
      </p>

      <div className="mt-5">

        <span className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
          {categoryIcons[club.category] || "⭐"} {club.category}
        </span>

        <p className="text-sm text-zinc-400 mt-3">
          Created by{" "}
          <span className="text-white font-medium">
            {club.author}
          </span>
        </p>

{isOwner && (
  <span className="inline-block mt-2 rounded-full bg-yellow-500/20 px-2 py-1 text-[10px] font-medium text-yellow-400">
    👑 Owner
  </span>
)}

        <div className="mt-4">
          <p className="text-sm font-medium text-white">
            Members ({club.memberCount})
          </p>

          <div className="mt-2 space-y-1">
            {club.members.slice(0, 4).map((member) => (
              <p
                key={member.id}
                className="text-xs text-zinc-400"
              >
                • {member.author}
              </p>
            ))}

            {club.memberCount > 4 && (
              <p className="text-xs text-zinc-500">
                +{club.memberCount - 4} more
              </p>
            )}
          </div>
        </div>

<div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
  <span>{club.memberCount} Members</span>

  <span>
    Created{" "}
    {new Date(club.created_at).toLocaleDateString()}
  </span>
</div>

        <JoinClubButton club={club} />

        {isOwner && (
  <div className="flex items-center justify-end gap-4 mt-4">

    <EditClubDialog club={club} />

    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 text-sm hover:text-red-400"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>

  </div>
)}

      </div>

    </div>
  );
}