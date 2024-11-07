"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WorkoutPage() {
  const router = useRouter();
  useEffect(() => {
    function redirect() {
      const today = new Date().toLocaleDateString("sv-SE");
      router.push(`/workout/${today}`);
    }

    redirect();
  }, [router]);
}
