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

import { updateTimetable } from "@/lib/actions/timetable";

export default function EditTimetableDialog({ item }) {
  const [open, setOpen] = useState(false);

  const [subject, setSubject] = useState(item.subject);
  const [teacher, setTeacher] = useState(item.teacher || "");
  const [room, setRoom] = useState(item.room || "");
  const [day, setDay] = useState(item.day);
  const [startTime, setStartTime] = useState(item.start_time.slice(0, 5));
  const [endTime, setEndTime] = useState(item.end_time.slice(0, 5));

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();

    if (!subject.trim() || !day || !startTime || !endTime) {
      alert("Please fill all required fields.");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be after start time.");
      return;
    }

    startTransition(async () => {
      try {
        await updateTimetable(item.id, {
          subject,
          teacher,
          room,
          day,
          start_time: startTime,
          end_time: endTime,
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
          <DialogTitle>Edit Class</DialogTitle>

          <DialogDescription className="text-zinc-400">
            Update your class details.
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
            type="text"
            placeholder="Teacher (optional)"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <input
            type="text"
            placeholder="Room (optional)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          />

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] p-3 text-white"
          >
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>

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