"use client";

import ViewAssignmentDialog from "./ViewAssignmentDialog";
import EditAssignmentDialog from "./EditAssignmentDialog";
import { deleteAssignment } from "@/lib/actions/assignments";

export default function AssignmentCard({
  assignment,
  currentUserId,
}) {
  const isOwner = assignment.user_id === currentUserId;

  async function handleDelete() {
    const ok = confirm("Delete this assignment?");

    if (!ok) return;

    try {
      await deleteAssignment(assignment.id);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5 space-y-4">

      <div>
        <h3 className="text-lg font-semibold text-white">
          {assignment.title}
        </h3>

        <p className="text-sm text-zinc-400 mt-1">
          {assignment.subject}
        </p>
      </div>

      <div className="space-y-2 text-sm">

        <div className="flex justify-between">
          <span className="text-zinc-500">Due Date</span>

          <span className="text-zinc-200">
            {new Date(assignment.due_date).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">Priority</span>

          <span className="text-zinc-200">
            {assignment.priority}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">Status</span>

          <span className="text-zinc-200">
            {assignment.status}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">Posted By</span>

          <span className="text-zinc-200 truncate ml-3">
            {assignment.author}
          </span>
        </div>

      </div>

      <div className="border-t border-[#2c2c2e] pt-3 flex justify-end gap-4">

        <ViewAssignmentDialog assignment={assignment}>
          <button className="text-blue-400 hover:text-blue-300 text-sm">
            View
          </button>
        </ViewAssignmentDialog>

        {isOwner && (
          <>
            <EditAssignmentDialog assignment={assignment} />

            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Delete
            </button>
          </>
        )}

      </div>

    </div>
  );
}