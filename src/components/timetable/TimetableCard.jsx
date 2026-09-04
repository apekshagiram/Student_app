"use client";

import EditTimetableDialog from "./EditTimetableDialog";
import { deleteTimetable } from "@/lib/actions/timetable";

export default function TimetableCard({ item }) {
  async function handleDelete() {
    const ok = confirm("Delete this class?");

    if (!ok) return;

    try {
      await deleteTimetable(item.id);
    } catch (error) {
      alert(error.message);
    }
  }

  function formatTime(time) {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  }

  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white">
        {item.subject}
      </h3>

      <div className="space-y-2 mt-3 text-sm">
        <p className="text-zinc-400">
          🕐 {formatTime(item.start_time)} - {formatTime(item.end_time)}
        </p>

        {item.teacher && (
          <p className="text-zinc-400">
            Teacher: {item.teacher}
          </p>
        )}

        {item.room && (
          <p className="text-zinc-400">
            Room: {item.room}
          </p>
        )}
      </div>

      <div className="border-t border-[#2c2c2e] mt-4 pt-3 flex justify-end gap-4">
        <EditTimetableDialog item={item} />

        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}