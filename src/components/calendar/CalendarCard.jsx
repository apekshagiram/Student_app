"use client";

import EditCalendarDialog from "./EditCalendarDialog";
import { deleteCalendarItem } from "@/lib/actions/calendar";

export default function CalendarCard({ item }) {
  async function handleDelete() {
    const ok = confirm("Delete this calendar event?");
    if (!ok) return;

    try {
      await deleteCalendarItem(item.id);
    } catch (error) {
      alert(error.message);
    }
  }

  function formatTime(time) {
    if (!time) return "";

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
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {item.title}
          </h3>

          <p className="text-sm text-zinc-400 mt-1">
            {item.calendar_date}
          </p>
        </div>

        <span className="text-xs text-zinc-500 border border-zinc-700 rounded-full px-3 py-1">
          {item.type}
        </span>
      </div>

      {item.description && (
        <p className="text-sm text-zinc-400 mt-3">
          {item.description}
        </p>
      )}

      {item.start_time && (
        <p className="text-sm text-zinc-400 mt-3">
          🕐 {formatTime(item.start_time)}
          {item.end_time && (
            <> - {formatTime(item.end_time)}</>
          )}
        </p>
      )}

      <div className="border-t border-[#2c2c2e] mt-4 pt-3 flex justify-end gap-4">
        <EditCalendarDialog item={item} />

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