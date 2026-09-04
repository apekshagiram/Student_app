"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getStudySessions() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("StudySessions")
    .select("*")
    .eq("user_id", user.id)
    .order("study_date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createStudySession(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("StudySessions")
    .insert({
      subject: formData.subject,
      study_date: formData.study_date,
      duration: formData.duration,
      notes: formData.notes,
      user_id: user.id,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/analytics");
}

export async function updateStudySession(id, formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("StudySessions")
    .update({
      subject: formData.subject,
      study_date: formData.study_date,
      duration: formData.duration,
      notes: formData.notes,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/analytics");
}

export async function deleteStudySession(id) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("StudySessions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/analytics");
}