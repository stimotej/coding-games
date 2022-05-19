import React, { useState, useEffect } from "react";

const ThemeSelect = () => {
  const [theme, setTheme] = useState(null);

  const handleSelectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    if (selectedTheme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", selectedTheme);
    }
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "system");

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex">
      <button
        className={`p-3 rounded-l-lg dark:text-white border border-r-0 dark dark:border-0 ${
          theme === "system"
            ? "bg-gray-100 dark:bg-secondary-light"
            : "bg-white dark:bg-secondary hover:bg-gray-100 dark:hover:bg-secondary-light"
        }`}
        onClick={() => handleSelectTheme("system")}
      >
        System
      </button>
      <button
        className={` dark:text-white border-t border-b dark:border-0 p-3 ${
          theme === "dark"
            ? "bg-gray-100 dark:bg-secondary-light"
            : "bg-white dark:bg-secondary hover:bg-gray-100 dark:hover:bg-secondary-light"
        }`}
        onClick={() => handleSelectTheme("dark")}
      >
        Dark
      </button>
      <button
        className={`dark:text-white p-3 rounded-r-lg border border-l-0 dark:border-0 ${
          theme === "light"
            ? "bg-gray-100 dark:bg-secondary-light"
            : "bg-white dark:bg-secondary hover:bg-gray-100 dark:hover:bg-secondary-light"
        }`}
        onClick={() => handleSelectTheme("light")}
      >
        Light
      </button>
    </div>
  );
};

export default ThemeSelect;
