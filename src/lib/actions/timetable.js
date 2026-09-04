"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Get user's timetable
export async function getTimetable() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("Timetable")
    .select("*")
    .eq("user_id", user.id)
    .order("day", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Create timetable entry
export async function createTimetable(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Timetable")
    .insert({
      subject: formData.subject,
      teacher: formData.teacher,
      room: formData.room,
      day: formData.day,
      start_time: formData.start_time,
      end_time: formData.end_time,
      user_id: user.id,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/timetable");
}

// Update timetable entry
export async function updateTimetable(id, formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Timetable")
    .update({
      subject: formData.subject,
      teacher: formData.teacher,
      room: formData.room,
      day: formData.day,
      start_time: formData.start_time,
      end_time: formData.end_time,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/timetable");
}

// Delete timetable entry
export async function deleteTimetable(id) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Timetable")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/timetable");
}