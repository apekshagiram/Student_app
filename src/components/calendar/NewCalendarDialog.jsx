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
import { createCalendarItem } from "@/lib/actions/calendar";

export default function NewCalendarDialog() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [type, setType] = useState("Personal");

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !date) {
      alert("Please enter a title and date.");
      return;
    }

    if (startTime && endTime && startTime >= endTime) {
      alert("End time must be after start time.");
      return;
    }

    startTransition(async () => {
      try {
        await createCalendarItem({
          title,
          description,
          calendar_date: date,
          start_time: startTime,
          end_time: endTime,
          type,
        });

        setOpen(false);

        setTitle("");
        setDescription("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setType("Personal");
      } catch (error) {
        alert(error.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200">
          + Add Event
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#1c1c1e] border border-[#2c2c2e] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Calendar Event</DialogTitle>

          <DialogDescription className="text-zinc-400">
            Add an event to your personal calendar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <textarea
            rows={3}
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white resize-none"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full mt-1 rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full mt-1 rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
              />
            </div>
          </div>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          >
            <option>Personal</option>
            <option>Study</option>
            <option>Assignment</option>
            <option>Exam</option>
            <option>Reminder</option>
          </select>

          <DialogFooter>
            <button
              type="submit"
              disabled={isPending}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Event"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}