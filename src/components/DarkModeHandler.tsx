"use client";

import { useEffect, useState } from "react";

const DarkModeHandler = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage for dark mode preference
    const darkModeSetting = localStorage.getItem("darkMode");
    if (darkModeSetting === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
};

export default DarkModeHandler;