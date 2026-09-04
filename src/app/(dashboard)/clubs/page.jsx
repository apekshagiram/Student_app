import { getClubs } from "@/lib/actions/clubs";
import { createClient } from "@/lib/supabase/server";
import NewClubDialog from "@/components/clubs/NewClubDialog";
import JoinClubButton from "@/components/clubs/JoinClubButton";
import ClubCard from "@/components/clubs/ClubCard";

export default async function ClubsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const clubs = await getClubs();

  const categoryIcons = {
  Technology: "💻",
  Sports: "⚽",
  Cultural: "🎭",
  Arts: "🎨",
  Academic: "📚",
  Music: "🎵",
  Other: "⭐",
};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Clubs
        </h1>

        <NewClubDialog />
      </div>

      {clubs.length === 0 ? (
        <div className="text-center py-20 border border-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-300">
            No Clubs Found
          </h2>

          <p className="text-zinc-500 mt-2">
            Create your first college club.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {clubs.map((club) => (
  <ClubCard
    key={club.id}
    club={club}
    currentUserId={user.id}
  />
))}
        </div>
      )}
    </div>
  );
}