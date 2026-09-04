"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Get all clubs
export async function getClubs() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: clubs, error } = await supabase
    .from("Clubs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  const { data: memberships } = await supabase
    .from("ClubMembers")
    .select("*");

  return clubs.map((club) => {
    const members = memberships.filter(
      (member) => member.club_id === club.id
    );

    return {
      ...club,
      memberCount: members.length,

      joined: members.some(
        (member) => member.user_id === user.id
      ),

      members,
    };
  });
}

// Create a new club
export async function createClub({
  name,
  description,
  category,
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in.");

  const { error } = await supabase.from("Clubs").insert({
    name,
    description,
    category,
    user_id: user.id,
    author: user.email,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/clubs");
}

// Update club
export async function updateClub(
  id,
  { name, description, category }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in.");

  const { error } = await supabase
    .from("Clubs")
    .update({
      name,
      description,
      category,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/clubs");
}

// Delete club
export async function deleteClub(id) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in.");

  const { error } = await supabase
    .from("Clubs")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/clubs");
}

// Join a club
export async function joinClub(clubId) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in.");

  const { error } = await supabase
    .from("ClubMembers")
    .insert({
  club_id: clubId,
  user_id: user.id,
  author: user.email,
});

  if (error) throw new Error(error.message);

  revalidatePath("/clubs");
}

// Leave a club
export async function leaveClub(clubId) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in.");

  const { error } = await supabase
    .from("ClubMembers")
    .delete()
    .eq("club_id", clubId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/clubs");
}