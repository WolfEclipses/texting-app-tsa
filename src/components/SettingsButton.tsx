"use client";

import { Moon, Settings, Sun, ToggleLeft, ToggleRight } from "lucide-react";
import { ButtonHTMLAttributes, FC, useState, useEffect } from "react";
import Button from "./UI/Button";
import Link from "next/link";

interface SettingsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

// Export the DarkBoolean

const SettingsButton: FC<SettingsButtonProps> = ({ ...props }) => {
   

  // Update DarkBoolean and persist dark mode to local storage
  

  return (
    <Button
      {...props}
      variant="ghost"
      onClick={async () => { 
      }}
    >
        <div>
            <Settings className="w-4 h-4 dark:hover:bg-zinc-800 dark:focus:ring-zinc-900 group-hover:text-accent text-zinc-900 dark:text-zinc-200" />
        </div>
    </Button>
  );
};

export { SettingsButton};