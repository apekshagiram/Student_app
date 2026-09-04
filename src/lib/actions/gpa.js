"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getGPA() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("GPA")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function saveGPA(cgpa, sgpa) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { data: existing, error: existingError } = await supabase
    .from("GPA")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (existing) {
    const { error } = await supabase
      .from("GPA")
      .update({
        cgpa: Number(cgpa),
        sgpa: Number(sgpa),
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .eq("user_id", user.id);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    const { error } = await supabase
      .from("GPA")
      .insert({
        user_id: user.id,
        cgpa: Number(cgpa),
        sgpa: Number(sgpa),
      });

    if (error) {
      throw new Error(error.message);
    }
  }

  revalidatePath("/dashboard");
}