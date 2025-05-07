"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Search, Bookmark, Bell, User } from "lucide-react";

const navItems = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Cari", href: "/cari", icon: Search },
  { name: "Notifikasi", href: "/notifikasi", icon: Bell },
  { name: "Simpan", href: "/simpan", icon: Bookmark },
  { name: "Profil", href: "/profil", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block">
      <ul className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent"
                )}
              >
                <Icon
                  className={cn("h-5 w-5", isActive && "text-primary")}
                />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}