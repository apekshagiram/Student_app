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
import { updateCalendarItem } from "@/lib/actions/calendar";

export default function EditCalendarDialog({ item }) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(
    item.description || ""
  );
  const [date, setDate] = useState(item.calendar_date);
  const [startTime, setStartTime] = useState(
    item.start_time ? item.start_time.slice(0, 5) : ""
  );
  const [endTime, setEndTime] = useState(
    item.end_time ? item.end_time.slice(0, 5) : ""
  );
  const [type, setType] = useState(item.type);

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
        await updateCalendarItem(item.id, {
          title,
          description,
          calendar_date: date,
          start_time: startTime,
          end_time: endTime,
          type,
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
          <DialogTitle>Edit Calendar Event</DialogTitle>

          <DialogDescription className="text-zinc-400">
            Update your calendar event.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-4"
        >
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <textarea
            rows={3}
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white resize-none"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                setStartTime(e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
            />

            <input
              type="time"
              value={endTime}
              onChange={(e) =>
                setEndTime(e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
            />
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
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}