"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState(session?.user?.name || "");
  const [username, setUsername] = useState("@username");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [gender, setGender] = useState("laki-laki");
  const [birthdate, setBirthdate] = useState("1999-12-25");
  
  if (status === "loading") {
    return <div className="container py-4">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Implementasi API nanti
      console.log({ name, username, email, gender, birthdate });
      
      // Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          name,
          email,
        },
      });

      toast.success("Profil berhasil diperbarui", {
        description: "Perubahan data profil berhasil disimpan",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Gagal memperbarui profil", {
        description: "Terjadi kesalahan saat menyimpan perubahan",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="container py-4">
      <h1 className="text-2xl font-bold mb-6">Pengaturan Akun</h1>
      
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={session?.user?.image || ""} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Nama lengkap</label>
          <div className="flex">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="ml-2"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Username</label>
          <div className="flex">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="ml-2"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Email</label>
          <div className="flex">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="ml-2"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Jenis kelamin</label>
          <div className="flex">
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laki-laki">Laki-laki</SelectItem>
                <SelectItem value="perempuan">Perempuan</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="ml-2"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Tanggal lahir</label>
          <div className="flex">
            <Input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="ml-2"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Button type="submit" className="w-full">Simpan Perubahan</Button>
      </form>
    </div>
  );
}