import { createClient } from "@/lib/supabase/server";
import { getAttendance } from "@/lib/actions/attendance";

export default async function AttendancePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const attendance = await getAttendance();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Attendance
          </h1>

          <p className="text-zinc-500 mt-1">
            Track your attendance for each subject.
          </p>
        </div>

        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200"> 
        </button>
      </div>

      {attendance.length === 0 ? (
        <div className="text-center py-20 border border-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-300">
            No Attendance Records
          </h2>

          <p className="text-zinc-500 mt-2">
            Add your first subject attendance.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {attendance.map((record) => {
            const percentage =
              record.total === 0
                ? 0
                : Math.round(
                    (record.attended / record.total) * 100
                  );

            return (
              <div
                key={record.id}
                className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {record.subject}
                </h3>

                <p className="text-zinc-400 mt-2">
                  {record.attended} / {record.total} classes
                </p>

                <p className="text-3xl font-bold text-white mt-4">
                  {percentage}%
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}