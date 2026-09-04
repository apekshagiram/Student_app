import { createClient } from "@/lib/supabase/server";
import { getAssignments } from "@/lib/actions/assignments";

import AssignmentCard from "@/components/assignments/AssignmentCard";
import NewAssignmentDialog from "@/components/assignments/NewAssignmentDialog";

export default async function AssignmentsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const assignments = await getAssignments();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Assignments
        </h1>

        <NewAssignmentDialog />
      </div>

      {assignments.length === 0 ? (
        <div className="text-center py-20 border border-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-300">
            No Assignments Found
          </h2>

          <p className="text-zinc-500 mt-2">
            Create your first assignment.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              currentUserId={user.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}