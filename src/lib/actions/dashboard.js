"use server";

import { createClient } from "@/lib/supabase/server";

export async function getRecentNotes() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Notes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getUpcomingEvents() {
  const supabase = await createClient();

  const today = new Date().toISOString();

  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(3);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getDashboardStats() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { count: notesCount } = await supabase
    .from("Notes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: eventsCount } = await supabase
    .from("Events")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: clubsJoined } = await supabase
    .from("ClubMembers")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return {
    notesCount: notesCount || 0,
    eventsCount: eventsCount || 0,
    clubsJoined: clubsJoined || 0,
  };
}

export async function getSuggestedClubs() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: joined } = await supabase
    .from("ClubMembers")
    .select("club_id")
    .eq("user_id", user.id);

  const joinedIds = joined?.map((club) => club.club_id) || [];

  let query = supabase
    .from("Clubs")
    .select("*")
    .limit(3);

  if (joinedIds.length > 0) {
    query = query.not("id", "in", `(${joinedIds.join(",")})`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getStudyAnalytics() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      totalMinutes: 0,
      totalSessions: 0,
    };
  }

  const { data, error } = await supabase
    .from("StudySessions")
    .select("duration")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  const totalMinutes = data.reduce(
    (total, session) => total + Number(session.duration),
    0
  );

  return {
    totalMinutes,
    totalSessions: data.length,
  };
}

export async function getDashboardAssignments() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Assignments")
    .select("*")
    .order("due_date", { ascending: true })
    .limit(5);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

