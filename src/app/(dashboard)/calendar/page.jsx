import { getCalendar } from "@/lib/actions/calendar";
import NewCalendarDialog from "@/components/calendar/NewCalendarDialog";
import CalendarCard from "@/components/calendar/CalendarCard";

export default async function CalendarPage() {
  const calendar = await getCalendar();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Calendar
          </h1>

          <p className="text-zinc-500 mt-1">
            Plan and manage your personal schedule.
          </p>
        </div>

        <NewCalendarDialog />
      </div>

      {calendar.length === 0 ? (
        <div className="text-center py-20 border border-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-300">
            No Calendar Events
          </h2>

          <p className="text-zinc-500 mt-2">
            Add your first personal event.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
  {calendar.map((item) => (
    <CalendarCard
      key={item.id}
      item={item}
    />
  ))}
</div>
      )}
    </div>
  );
}