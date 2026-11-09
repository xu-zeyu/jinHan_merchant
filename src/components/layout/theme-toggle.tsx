"use client";

import { useEffect, useState } from "react";
import { Check, Moon, Palette, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Accent = "amber" | "sage" | "lilac";

const THEMES: { id: Accent; label: string; swatch: string }[] = [
  { id: "amber", label: "暖金", swatch: "#FFB84D" },
  { id: "sage", label: "薄荷", swatch: "#92CCB2" },
  { id: "lilac", label: "雾紫", swatch: "#C2ABF2" },
];

const MODE_KEY = "pettown-theme-mode";
const ACCENT_KEY = "pettown-theme-accent";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [accent, setAccent] = useState<Accent>("amber");

  useEffect(() => {
    const mode = window.localStorage.getItem(MODE_KEY) ?? window.localStorage.getItem("pettown-theme");
    const nextDark = mode === "dark" || (mode === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const savedAccent = window.localStorage.getItem(ACCENT_KEY);
    const nextAccent = THEMES.find((theme) => theme.id === savedAccent)?.id ?? "amber";
    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.dataset.theme = nextAccent;
    setDark(nextDark);
    setAccent(nextAccent);
  }, []);

  const changeAccent = (next: Accent) => {
    setAccent(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(ACCENT_KEY, next);
  };

  const toggleMode = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem(MODE_KEY, next ? "dark" : "light");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="更换主题" size="icon" variant="ghost"><Palette className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-surface w-44 p-2">
        <DropdownMenuLabel className="text-xs text-muted-foreground">外观</DropdownMenuLabel>
        {THEMES.map((theme) => (
          <DropdownMenuItem key={theme.id} onClick={() => changeAccent(theme.id)}>
            <span className="h-4 w-4 rounded-full border border-white/70" style={{ backgroundColor: theme.swatch }} />
            {theme.label}
            {accent === theme.id ? <Check className="ml-auto h-4 w-4" /> : null}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleMode}>
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {dark ? "浅色模式" : "深色模式"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
