"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark";

function getCurrentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event("theme-change"));
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const syncTheme = () => setTheme(getCurrentTheme());

    syncTheme();
    window.addEventListener("theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  if (!theme) {
    return <button className="p-2 ml-4 w-9 h-9 opacity-0"></button>;
  }

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 ml-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
      aria-label="Chuyen doi giao dien sang toi"
      title="Chuyển đổi Giao diện"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
