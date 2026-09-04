"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Get attendance for the logged-in student
export async function getAttendance() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("Attendance")
    .select("*")
    .eq("student_id", user.id)
    .order("attendance_date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Teacher marks attendance
export async function createAttendance(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Attendance")
    .insert({
      subject: formData.subject,
      student_id: formData.student_id,
      teacher_id: user.id,
      attendance_date: formData.attendance_date,
      status: formData.status,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/attendance");
}

// Teacher updates attendance
export async function updateAttendance(id, formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Attendance")
    .update({
      subject: formData.subject,
      student_id: formData.student_id,
      attendance_date: formData.attendance_date,
      status: formData.status,
    })
    .eq("id", id)
    .eq("teacher_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/attendance");
}

// Teacher deletes attendance
export async function deleteAttendance(id) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in.");
  }

  const { error } = await supabase
    .from("Attendance")
    .delete()
    .eq("id", id)
    .eq("teacher_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/attendance");
}