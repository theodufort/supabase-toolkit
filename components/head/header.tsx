"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import ThemeSwitcher from "@/components/general/theme-switcher";

// Create a single Supabase client instance outside the component
const supabase = createClient();

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const updateUserState = useCallback((session: any) => {
    setUser(session?.user ?? null);
    setIsLoading(false);
  }, []);

  const checkAuthState = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      updateUserState(session);
    } catch (error) {
      console.error("Error checking auth state:", error);
      updateUserState(null);
    }
  }, [updateUserState]);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        await checkAuthState();
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    // Initialize auth state
    initializeAuth();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        updateUserState(session);
      }
    });

    // Cleanup
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkAuthState, updateUserState]);

  // Force auth state check when pathname changes (after login/signup)
  useEffect(() => {
    checkAuthState();
  }, [pathname, checkAuthState]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return (
      <header className="w-full p-4 flex justify-between items-center border-b">
        <div className="text-xl font-bold">
          <a href="/">Supabase Toolkit</a>
        </div>
        <nav className="flex gap-4">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded"></div>
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded"></div>
        </nav>
      </header>
    );
  }

  return (
    <header className="w-full p-4 flex justify-between items-center border-b">
      <div className="text-xl font-bold">
        <a href="/">Supabase Toolkit</a>
      </div>
      <nav className="flex gap-4 items-center">
        <ThemeSwitcher />
        {!user ? (
          <>
            <a
              href="/signup"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background px-4 py-2 hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              Sign up
            </a>
            <a
              href="/login"
              className="rounded-full border border-solid dark:border-white/[.145] transition-colors flex items-center justify-center px-4 py-2 hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              Log in
            </a>
          </>
        ) : (
          <button
            onClick={handleSignOut}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center px-4 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
          >
            Sign out
          </button>
        )}
      </nav>
    </header>
  );
}
