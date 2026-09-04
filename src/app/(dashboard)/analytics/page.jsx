import { getStudySessions } from "@/lib/actions/study-sessions";
import NewStudySessionDialog from "@/components/analytics/NewStudySessionDialog";
import StudySessionCard from "@/components/analytics/StudySessionCard";

export default async function AnalyticsPage() {
  const sessions = await getStudySessions();

  const totalMinutes = sessions.reduce(
    (total, session) => total + Number(session.duration),
    0
  );

  const totalHours = (totalMinutes / 60).toFixed(1);

  const totalSessions = sessions.length;

  const subjectTotals = {};

  sessions.forEach((session) => {
    if (!subjectTotals[session.subject]) {
      subjectTotals[session.subject] = 0;
    }

    subjectTotals[session.subject] += Number(session.duration);
  });

  const subjects = Object.entries(subjectTotals).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Study Analytics
        </h1>

        <p className="text-zinc-500 mt-1">
          Track your study time and understand your study habits.
        </p>
         </div>

      <NewStudySessionDialog />
      

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
          <p className="text-sm text-zinc-500">
            Total Study Time
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {totalHours} hrs
          </h2>
        </div>

        <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
          <p className="text-sm text-zinc-500">
            Study Sessions
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {totalSessions}
          </h2>
        </div>

        <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-5">
          <p className="text-sm text-zinc-500">
            Subjects Studied
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {subjects.length}
          </h2>
        </div>
      </div>

      {/* Subject Breakdown */}
<div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-6">
  <h2 className="text-lg font-semibold text-white">
    Study Time by Subject
  </h2>

  {subjects.length === 0 ? (
    <p className="text-zinc-500 mt-4">
      No study data yet.
    </p>
  ) : (
    <div className="space-y-5 mt-5">
      {subjects.map(([subject, minutes]) => {
        const maxMinutes = subjects[0][1];
        const percentage =
          maxMinutes > 0
            ? (minutes / maxMinutes) * 100
            : 0;

        return (
          <div key={subject}>
            <div className="flex justify-between mb-2">
              <span className="text-zinc-300">
                {subject}
              </span>

              <span className="text-zinc-400 text-sm">
                {Math.floor(minutes / 60)}h {minutes % 60}m
              </span>
            </div>

            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>
    </div>
  );
}