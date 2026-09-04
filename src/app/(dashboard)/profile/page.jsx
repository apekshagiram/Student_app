import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Profile
        </h1>

        <p className="text-zinc-500 mt-1">
          View your account information.
        </p>
      </div>

      <div className="max-w-2xl bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white">
          Account Information
        </h2>

        <div className="space-y-5 mt-6">
          <div>
            <p className="text-xs text-zinc-500">
              Email
            </p>

            <p className="text-white mt-1">
              {user?.email || "Not available"}
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-500">
              User ID
            </p>

            <p className="text-sm text-zinc-400 mt-1 break-all">
              {user?.id || "Not available"}
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-500">
              Account Created
            </p>

            <p className="text-white mt-1">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}