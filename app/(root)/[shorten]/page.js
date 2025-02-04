"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RedirectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const shortUrl = pathname.split("/").pop();

  useEffect(() => {
    async function redirect() {
      try {
        console.log("Redirecting to:", shortUrl);
        const res = await fetch(`/api/${shortUrl}`);
        if (!res.ok) {
          throw new Error("Failed to fetch URL");
        }
        const data = await res.json();
        if (data.longUrl) {
          router.push(data.longUrl);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error redirecting:", error);
        router.push("/404");
      }
    }

    if (shortUrl) {
      redirect();
    }
  });

  return null;
}
