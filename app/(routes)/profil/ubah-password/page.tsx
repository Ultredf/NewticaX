"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function UbahPasswordPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  if (status === "loading") {
    return <div className="container py-4">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validasi password
    if (newPassword.length < 8) {
      setError("Password harus minimal 8 karakter");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }
    
    try {
      // Implementasi API nanti
      console.log({ currentPassword, newPassword });
      
      // Sukses
      toast.success("Password berhasil diubah", {
        description: "Password Anda telah berhasil diperbarui",
        duration: 3000,
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error("Gagal mengubah password", {
        description: "Pastikan password saat ini benar.",
        duration: 3000,
      });
      setError("Gagal mengubah password. Pastikan password saat ini benar.");
    }
  };
  
  return (
    <div className="container py-4">
      <h1 className="text-2xl font-bold mb-6">Ubah Password</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">
            Password saat ini
          </label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">
            Password baru
          </label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">
            Konfirmasi password baru
          </label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <Button type="submit" className="w-full">Ubah Password</Button>
      </form>
    </div>
  );
}