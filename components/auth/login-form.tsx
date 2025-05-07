"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      
      if (result?.error) {
        setError("Email atau password yang anda masukkan salah.");
      } else {
        toast.success("Login berhasil", {
          description: "Selamat datang kembali!",
          duration: 3000,
        });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <div className="flex justify-end">
          <Button
            type="button"
            variant="link"
            className="text-sm px-0"
            onClick={() => router.push("/lupa-password")}
          >
            Lupa password?
          </Button>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          Masuk
        </Button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Atau lanjutkan dengan
            </span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            disabled={isLoading}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => signIn("github", { callbackUrl: "/" })}
            disabled={isLoading}
          >
            <FaGithub className="mr-2 h-5 w-5" />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}