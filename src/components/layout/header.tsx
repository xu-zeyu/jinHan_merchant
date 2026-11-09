"use client";

import { UserMenu } from "./user-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-end gap-2 border-b border-border/40 bg-background/80 px-6 backdrop-blur-xl">
      <UserMenu />
    </header>
  );
}
