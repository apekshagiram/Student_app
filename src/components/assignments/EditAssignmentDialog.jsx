"use client";

import { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { updateAssignment } from "@/lib/actions/assignments";

export default function EditAssignmentDialog({ assignment }) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(assignment.title);
  const [subject, setSubject] = useState(assignment.subject);
  const [description, setDescription] = useState(
    assignment.description || ""
  );
  const [dueDate, setDueDate] = useState(assignment.due_date);

  const [priority, setPriority] = useState(
    assignment.priority
  );

  const [status, setStatus] = useState(
    assignment.status
  );

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    startTransition(async () => {
      try {
        await updateAssignment(assignment.id, {
          title,
          subject,
          description,
          due_date: dueDate,
          priority,
          status,
        });

        setOpen(false);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-yellow-500 text-sm hover:text-yellow-400">
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#1c1c1e] border border-[#2c2c2e] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Assignment</DialogTitle>

          <DialogDescription className="text-zinc-400">
            Update your assignment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3"
          />

          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3"
          />

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 resize-none"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <DialogFooter>
            <button
              type="submit"
              disabled={isPending}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}