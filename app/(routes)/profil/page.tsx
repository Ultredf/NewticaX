"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ChevronRight, Settings, KeyRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  if (status === "loading") {
    return <div className="container py-4">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }
  
  const user = session?.user;
  
  return (
    <div className="container py-4">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
          <AvatarFallback>
            {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold">{user?.name || "Pengguna"}</h1>
          <p className="text-sm text-muted-foreground">
            {user?.email || "pengguna@example.com"}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Link
          href="/profil/pengaturan"
          className="flex items-center justify-between p-4 bg-card rounded-lg"
        >
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span>Pengaturan Akun</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
        
        <Link
          href="/profil/ubah-password"
          className="flex items-center justify-between p-4 bg-card rounded-lg"
        >
          <div className="flex items-center gap-3">
            <KeyRound className="h-5 w-5 text-muted-foreground" />
            <span>Ubah Password</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
        
        <Button
          variant="outline"
          className="w-full justify-start text-red-500 border-red-200"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Keluar
        </Button>
      </div>
    </div>
  );
}