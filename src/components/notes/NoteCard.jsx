"use client";

import { useTransition } from "react";

import { deleteNote } from "@/lib/actions/notes";
import EditNoteDialog from "@/components/notes/EditNoteDialog";

export default function NoteCard({ note, currentUserId }) {
  const [isPending, startTransition] = useTransition();

  const isOwner = note.user_id === currentUserId;

  function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    startTransition(async () => {
      try {
        await deleteNote(note.id);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
      <h2 className="font-semibold text-white mb-3">
        {note.author}
      </h2>

      <p className="text-zinc-400 whitespace-pre-wrap">
        {note.text}
      </p>

      <div className="flex items-center justify-between mt-5">
        <p className="text-xs text-zinc-500">
          {new Date(note.created_at).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
})}
        </p>

        {isOwner && (
          <div className="flex items-center gap-4">
            <EditNoteDialog note={note} />

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