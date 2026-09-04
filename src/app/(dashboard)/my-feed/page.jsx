import { getMyNotes } from "@/lib/actions/notes";
import { createClient } from "@/lib/supabase/server";

import NewNoteDialog from "@/components/notes/NewNoteDialog";
import NoteCard from "@/components/notes/NoteCard";

export default async function MyFeedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const notes = await getMyNotes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          My Feed
        </h1>

        <NewNoteDialog />
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-20 border border-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-300">
            No Notes Found
          </h2>

          <p className="text-zinc-500 mt-2">
            You haven't posted any notes yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              currentUserId={user.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}