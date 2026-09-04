import { getTimetable } from "@/lib/actions/timetable";
import NewTimetableDialog from "@/components/timetable/NewTimetableDialog";
import TimetableCard from "@/components/timetable/TimetableCard";

export default async function TimetablePage() {
  const timetable = await getTimetable();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold text-white">
      Timetable
    </h1>

    <p className="text-zinc-500 mt-1">
      View and manage your weekly class schedule.
    </p>
  </div>

  <NewTimetableDialog />
</div>
      

      {timetable.length === 0 ? (
        <div className="text-center py-20 border border-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-300">
            No Classes Added
          </h2>

          <p className="text-zinc-500 mt-2">
            Add your classes to build your timetable.
          </p>
        </div>
        
      ) : (
        <div className="space-y-6">
          {days.map((day) => {
            const classes = timetable.filter(
              (item) => item.day === day
            );

            if (classes.length === 0) return null;

            return (
              <div key={day}>
                <h2 className="text-lg font-semibold text-white mb-3">
                  {day}
                </h2>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {classes.map((item) => (
                  <TimetableCard
                    key={item.id}
                    item={item}
                  />
                ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}