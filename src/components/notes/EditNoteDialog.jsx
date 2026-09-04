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

import { updateNote } from "@/lib/actions/notes";

export default function EditNoteDialog({ note }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(note.text);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    startTransition(async () => {
      try {
        console.log("Editing Note ID:", note.id);
        await updateNote(note.id, text);

        setOpen(false);
      } catch (err) {
        alert(err.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-blue-500 hover:text-blue-400 text-sm">
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#1c1c1e] border border-[#2c2c2e] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>

          <DialogDescription className="text-zinc-400">
            Update your note.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <textarea
          maxLength={1000}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-zinc-700 bg-[#2c2c2e] text-white placeholder:text-zinc-500 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-white"
          />

          <p className="text-right text-xs text-zinc-500">
  {text.length} / 1000
</p>

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