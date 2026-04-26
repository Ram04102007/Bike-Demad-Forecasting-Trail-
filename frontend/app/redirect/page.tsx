"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { router.push("/auth/login"); return; }
    const role = user.unsafeMetadata?.role as string;
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "consumer") {
      router.push("/consumer/home");
    } else {
      // No role set — send to login to pick role
      router.push("/auth/login");
    }
  }, [isLoaded, user, router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}