"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher({
  iconOnly = false,
}: {
  iconOnly?: boolean;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const themes = [
    { value: "light", label: "Light", icon: "☀️" },
    { value: "dark", label: "Dark", icon: "🌙" },
    { value: "system", label: "System", icon: "💻" },
  ];

  const currentTheme = themes.find((t) => t.value === theme);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors px-3 py-2 bg-white text-black dark:bg-[#1a1a1a] dark:text-white hover:bg-gray-100 dark:hover:bg-[#232323]"
        aria-label="Toggle theme"
      >
        <span className="text-lg">{currentTheme?.icon}</span>
        <span className="hidden sm:inline">{currentTheme?.label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-gray-800 shadow-lg z-50">
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              value={themeOption.value}
              onClick={() => {
                setTheme(themeOption.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors
                ${
                  theme === themeOption.value
                    ? "bg-[#f2f2f2] dark:bg-[#1a1a1a] font-semibold text-black dark:text-white"
                    : "text-gray-900 dark:text-gray-200"
                }
                ${themeOption.value === "light" ? "rounded-t-lg" : ""}
                ${themeOption.value === "system" ? "rounded-b-lg" : ""}
              `}
            >
              <span className="text-lg">{themeOption.icon}</span>
              <span>{themeOption.label}</span>
              {theme === themeOption.value && (
                <svg
                  className="ml-auto h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
