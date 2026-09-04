"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Get user's calendar
export async function getCalendar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("Calendar")
    .select("*")
    .eq("user_id", user.id)
    .order("calendar_date", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Create calendar item
export async function createCalendarItem(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Calendar")
    .insert({
      title: formData.title,
      description: formData.description,
      calendar_date: formData.calendar_date,
      start_time: formData.start_time || null,
      end_time: formData.end_time || null,
      type: formData.type,
      user_id: user.id,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/calendar");
}

// Update calendar item
export async function updateCalendarItem(id, formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Calendar")
    .update({
      title: formData.title,
      description: formData.description,
      calendar_date: formData.calendar_date,
      start_time: formData.start_time || null,
      end_time: formData.end_time || null,
      type: formData.type,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/calendar");
}

// Delete calendar item
export async function deleteCalendarItem(id) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Calendar")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/calendar");
}