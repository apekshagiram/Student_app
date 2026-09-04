"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Get All Assignments
export async function getAssignments() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Assignments")
    .select("*")
    .order("due_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Create Assignment
export async function createAssignment(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Assignments")
    .insert({
      title: formData.title,
      subject: formData.subject,
      description: formData.description,
      due_date: formData.due_date,
      priority: formData.priority,
      status: formData.status,
      user_id: user.id,
      author: user.email,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/assignments");
}

// Update Assignment
export async function updateAssignment(id, formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Assignments")
    .update({
      title: formData.title,
      subject: formData.subject,
      description: formData.description,
      due_date: formData.due_date,
      priority: formData.priority,
      status: formData.status,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/assignments");
}

// Delete Assignment
export async function deleteAssignment(id) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Assignments")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/assignments");
}