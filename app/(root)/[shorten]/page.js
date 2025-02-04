"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectPage(params) {
  const router = useRouter();
  const { shortUrl } = params;

  useEffect(() => {
    async function redirect() {
      try {
        const res = await fetch(`/api/${shortUrl}`);
        if (!res.ok) {
          throw new Error("Failed to fetch URL");
        }
        const data = await res.json();
        if (data.longUrl) {
          window.location.href = data.longUrl;
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error redirecting:", error);
        router.push("/404");
      }
    }

    redirect();
  }, [shortUrl, router]);

  return <div>Redirecting...</div>;
}
