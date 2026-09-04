"use client";

import { useTransition } from "react";

import { deleteEvent } from "@/lib/actions/events";
import EditEventDialog from "@/components/events/EditEventDialog";

export default function EventCard({ event, currentUserId }) {
  const [isPending, startTransition] = useTransition();

  const isOwner = event.user_id === currentUserId;

  function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    startTransition(async () => {
      try {
        await deleteEvent(event.id);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
      <h2 className="text-lg font-semibold text-white">
        {event.title}
      </h2>

      <p className="text-zinc-400 mt-3 whitespace-pre-wrap">
        {event.description}
      </p>

      <div className="mt-5 space-y-2 text-sm text-zinc-500">
        <p>📍 {event.location || "No location"}</p>

        <p>
          📅{" "}
          {new Date(event.event_date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <p>👤 {event.author}</p>
      </div>

      {isOwner && (
        <div className="flex items-center justify-end gap-4 mt-5">
          <EditEventDialog event={event} />

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
  );
}