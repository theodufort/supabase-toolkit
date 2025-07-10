"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  if (formData.get("password") !== formData.get("password_confirm")) {
    throw new Error("Passwords do not match");
  }

  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw new Error(error.message);
  }

  // Revalidate the layout to ensure auth state is updated
  revalidatePath("/", "layout");

  return { success: true };
}
