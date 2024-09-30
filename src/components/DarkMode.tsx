"use client";

import { Moon, Sun, ToggleLeft, ToggleRight } from "lucide-react";
import { ButtonHTMLAttributes, FC, useState, useEffect } from "react";
import Button from "./UI/Button";

interface DarkModeProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

// Export the DarkBoolean
let DarkBoolean: boolean = false;

const DarkModeButton: FC<DarkModeProps> = ({ ...props }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Load dark mode from local storage on initial render
  useEffect(() => {
    const darkModeSetting = localStorage.getItem("darkMode");
    if (darkModeSetting === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      DarkBoolean = true;
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      DarkBoolean = false;
    }
  }, []);

  // Update DarkBoolean and persist dark mode to local storage
  const handleToggle = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
      DarkBoolean = false;
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
      DarkBoolean = true;
    }
  };

  return (
    <Button
      {...props}
      variant="ghost"
      onClick={async () => {
        handleToggle();
      }}
    >
      {isDarkMode ? (
        <div>
          <ToggleRight className="w-auto h-auto dark:hover:bg-zinc-800 dark:focus:ring-zinc-900 group-hover:text-orange-600 text-zinc-900 dark:text-zinc-200" />
          <Moon className="w-auto h-auto dark:hover:bg-zinc-800 dark:focus:ring-zinc-900 group-hover:text-orange-600 text-zinc-900 dark:text-zinc-200" />
          <span className="text-md font-bold leading-6 text-gray-800 dark:text-zinc-300 text-center">
            Dark Mode
          </span>
        </div>
      ) : (
        <div>
          <ToggleLeft className="w-auto h-auto dark:hover:bg-zinc-800 dark:focus:ring-zinc-900 group-hover:text-orange-600 text-zinc-900 dark:text-zinc-200" />
          <Sun className="w-auto h-auto dark:hover:bg-zinc-800 dark:focus:ring-zinc-900 group-hover:text-orange-600 text-zinc-900 dark:text-zinc-200" />
          <span className="text-md font-bold leading-6 text-gray-800 dark:text-zinc-300 text-center">
            Light Mode
          </span>
        </div>
      )}
    </Button>
  );
};

export { DarkModeButton, DarkBoolean };