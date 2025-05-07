"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Search, Bookmark, User } from "lucide-react";

const navItems = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Cari", href: "/cari", icon: Search },
  { name: "Simpan", href: "/simpan", icon: Bookmark },
  { name: "Profil", href: "/profil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-xs",
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn("h-5 w-5 mb-1", isActive && "text-primary")}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}