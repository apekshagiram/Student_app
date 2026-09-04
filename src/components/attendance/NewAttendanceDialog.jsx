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

import { createAttendance } from "@/lib/actions/attendance";

export default function NewAttendanceDialog() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();

    if (!subject.trim() || attended === "" || total === "") {
      alert("Please fill all fields.");
      return;
    }

    if (Number(attended) < 0 || Number(total) < 0) {
      alert("Attendance values cannot be negative.");
      return;
    }

    if (Number(attended) > Number(total)) {
      alert("Attended classes cannot be greater than total classes.");
      return;
    }

    startTransition(async () => {
      try {
        await createAttendance({
          subject,
          attended: Number(attended),
          total: Number(total),
        });

        setOpen(false);

        setSubject("");
        setAttended("");
        setTotal("");
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200">
          + Add Attendance
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#1c1c1e] border border-[#2c2c2e] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Attendance</DialogTitle>

          <DialogDescription className="text-zinc-400">
            Add attendance details for a subject.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <input
            type="number"
            min="0"
            placeholder="Classes Attended"
            value={attended}
            onChange={(e) => setAttended(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <input
            type="number"
            min="0"
            placeholder="Total Classes"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <DialogFooter>
            <button
              type="submit"
              disabled={isPending}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Attendance"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}