"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ViewAssignmentDialog({ assignment, children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="bg-[#1c1c1e] border border-[#2c2c2e] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{assignment.title}</DialogTitle>

          <DialogDescription className="text-zinc-400">
            Assignment Details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-4">

          <div>
            <h4 className="text-xs uppercase text-zinc-500 mb-1">
              Subject
            </h4>

            <p className="text-zinc-200">
              {assignment.subject}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase text-zinc-500 mb-1">
              Description
            </h4>

            <p className="text-zinc-300 whitespace-pre-wrap">
              {assignment.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <h4 className="text-xs uppercase text-zinc-500 mb-1">
                Due Date
              </h4>

              <p className="text-zinc-200">
                {new Date(assignment.due_date).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase text-zinc-500 mb-1">
                Priority
              </h4>

              <p className="text-zinc-200">
                {assignment.priority}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase text-zinc-500 mb-1">
                Status
              </h4>

              <p className="text-zinc-200">
                {assignment.status}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase text-zinc-500 mb-1">
                Posted By
              </h4>

              <p className="text-zinc-200">
                {assignment.author}
              </p>
            </div>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}