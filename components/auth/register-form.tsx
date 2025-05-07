"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password) {
      setError("Semua field harus diisi");
      return;
    }
    
    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Implementasi API register nanti
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
      }
      
      toast.success("Registrasi berhasil", {
        description: "Silakan login dengan akun baru Anda",
        duration: 3000,
      });
      
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan, silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Masukkan nama anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Masukkan email anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {error && <div className="text-red-500 text-sm">{error}</div>}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          Daftar
        </Button>
      </form>
    </div>
  );
}