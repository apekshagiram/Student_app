import { getEvents } from "@/lib/actions/events";
import { createClient } from "@/lib/supabase/server";
import NewEventDialog from "@/components/events/NewEventDialog";
import EventCard from "@/components/events/EventCard";

export default async function EventsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const events = await getEvents();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Events
        </h1>

        <NewEventDialog />
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 border border-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-300">
            No Events Found
          </h2>

          <p className="text-zinc-500 mt-2">
            Create your first event.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {events.map((event) => (
  <EventCard
    key={event.id}
    event={event}
    currentUserId={user.id}
  />
))}
        </div>
      )}
    </div>
  );
}