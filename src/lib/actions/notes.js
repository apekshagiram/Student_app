"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getNotes() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}


export async function getMyNotes() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("Notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createNote(text) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in.");

  const { error } = await supabase.from("Notes").insert({
    text,
    author: user.email,
    user_id: user.id,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/notes");
}

export async function updateNote(noteId, text) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Current User:", user?.id);
  console.log("Note ID:", noteId);
  console.log("New Text:", text);

  const { data, error } = await supabase
    .from("Notes")
    .update({
      text,
    })
    .eq("id", noteId)
    .eq("user_id", user.id)
    .select();

  console.log("Updated Rows:", data);
  console.log("Update Error:", error);

  if (error) throw new Error(error.message);

  revalidatePath("/notes");
}

export async function deleteNote(noteId) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in.");

  const { error } = await supabase
    .from("Notes")
    .delete()
    .eq("id", noteId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/notes");
}