"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "./actions";
import { signupSchema, type SignupFormData } from "@/schemas/auth";
import { ZodError } from "zod";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    password_confirm: "",
  });
  const router = useRouter();

  const validateField = (name: string, value: string) => {
    try {
      // For all fields, we'll validate the entire form and extract the specific error
      const currentData = { ...formData, [name]: value };
      signupSchema.parse(currentData);
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      if (err instanceof ZodError) {
        // Map Zod errors to field errors
        const fieldErrs: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) fieldErrs[e.path[0] as string] = e.message;
        });
        setFieldErrors(fieldErrs);
      } else if (err instanceof Error) {
        setFieldErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      setError(null);
      setFieldErrors({});
      setIsLoading(true);

      // Validate the entire form
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        password_confirm: formData.get("password_confirm") as string,
      };

      const validatedData = signupSchema.parse(data);
      const result = await signup(formData);

      if (result.success) {
        // Force a session refresh to ensure auth state is updated
        const { createClient } = await import("@/utils/supabase/client");
        const supabase = createClient();
        await supabase.auth.getSession();

        // Use client-side navigation to ensure auth state is properly updated
        router.push("/");
      }
    } catch (err) {
      if (err instanceof ZodError) {
        // Map Zod errors to field errors
        const fieldErrs: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) fieldErrs[e.path[0] as string] = e.message;
        });
        setFieldErrors(fieldErrs);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <form
        className="w-full max-w-md bg-zinc-900 p-8 rounded-lg shadow-lg border border-zinc-800 space-y-6"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Sign Up
        </h2>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-200"
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`w-full px-3 py-2 rounded-md bg-zinc-800 text-white border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              fieldErrors.email ? "border-red-500" : "border-zinc-700"
            }`}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-200"
          >
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className={`w-full px-3 py-2 rounded-md bg-zinc-800 text-white border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              fieldErrors.password ? "border-red-500" : "border-zinc-700"
            }`}
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
          )}
          <p className="text-zinc-400 text-xs">
            Must be at least 6 characters with uppercase, lowercase, and number
          </p>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password_confirm"
            className="block text-sm font-medium text-zinc-200"
          >
            Confirm Password:
          </label>
          <input
            id="password_confirm"
            name="password_confirm"
            type="password"
            value={formData.password_confirm}
            onChange={handleInputChange}
            required
            className={`w-full px-3 py-2 rounded-md bg-zinc-800 text-white border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              fieldErrors.password_confirm
                ? "border-red-500"
                : "border-zinc-700"
            }`}
          />
          {fieldErrors.password_confirm && (
            <p className="text-red-500 text-xs mt-1">
              {fieldErrors.password_confirm}
            </p>
          )}
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-3">
          <button
            formAction={handleSubmit}
            disabled={isLoading}
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
          <Link href="/login" className="w-full">
            <button
              type="button"
              className="w-full py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-white font-semibold transition-colors"
            >
              Log in
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
