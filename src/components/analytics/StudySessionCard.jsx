"use client";

import { deleteStudySession } from "@/lib/actions/study-sessions";
import EditStudySessionDialog from "./EditStudySessionDialog";

export default function StudySessionCard({ session }) {
  async function handleDelete() {
    const ok = confirm("Delete this study session?");
    if (!ok) return;

    try {
      await deleteStudySession(session.id);
    } catch (error) {
      alert(error.message);
    }
  }

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} min`;
    }

    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${remainingMinutes} min`;
  }

  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {session.subject}
          </h3>

          <p className="text-sm text-zinc-400 mt-1">
            {session.study_date}
          </p>
        </div>

        <span className="text-sm text-zinc-300">
          {formatDuration(Number(session.duration))}
        </span>
      </div>

      {session.notes && (
        <p className="text-sm text-zinc-400 mt-3">
          {session.notes}
        </p>
      )}

      <div className="border-t border-[#2c2c2e] mt-4 pt-3 flex justify-end gap-4">
        <EditStudySessionDialog session={session} />

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