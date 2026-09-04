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
import { createStudySession } from "@/lib/actions/study-sessions";

export default function NewStudySessionDialog() {
  const [open, setOpen] = useState(false);

  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();

    if (!subject.trim() || !date || !duration) {
      alert("Please fill all required fields.");
      return;
    }

    if (Number(duration) <= 0) {
      alert("Study duration must be greater than 0.");
      return;
    }

    startTransition(async () => {
      try {
        await createStudySession({
          subject,
          study_date: date,
          duration: Number(duration),
          notes,
        });

        setOpen(false);

        setSubject("");
        setDate("");
        setDuration("");
        setNotes("");
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200">
          + Add Study Session
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#1c1c1e] border border-[#2c2c2e] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Study Session</DialogTitle>

          <DialogDescription className="text-zinc-400">
            Record the time you spent studying.
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
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <div>
            <label className="text-sm text-zinc-400">
              Duration (minutes)
            </label>

            <input
              type="number"
              min="1"
              placeholder="e.g. 90"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full mt-1 rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white resize-none"
          />

          <DialogFooter>
            <button
              type="submit"
              disabled={isPending}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Session"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}