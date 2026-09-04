"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getEvents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createEvent({
  title,
  description,
  location,
  event_date,
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase.from("Events").insert({
    title,
    description,
    location,
    event_date,
    user_id: user.id,
    author: user.email,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/events");
}

export async function updateEvent(
  id,
  { title, description, location, event_date }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Events")
    .update({
      title,
      description,
      location,
      event_date,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/events");
}

export async function deleteEvent(id) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Events")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/events");
}