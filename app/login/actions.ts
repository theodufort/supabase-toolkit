"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  console.log(error);
  if (error) {
    throw new Error(error.message);
  }

  // Revalidate the layout to ensure auth state is updated
  revalidatePath("/", "layout");

  return { success: true };
}
