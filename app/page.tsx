"use client";

import { useState } from "react";

export default function Home() {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  async function handleShorten() {
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        body: JSON.stringify({ longUrl }),
      });

      if (!res.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  }

  return (
    <div className="bg-yellow-200 min-h-screen flex justify-center items-center p-4">
      <div className="text-center max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl text-blue-600 mb-4 font-bold">
          Shorten Your Links in Seconds
        </h1>
        <h3 className="text-xl text-gray-700 mb-6">
          Paste your long URL and get a short, shareable link instantly.
        </h3>
        <input
          className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="url"
          value={longUrl}
          placeholder="Paste your long URL here..."
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button
          className="text-center text-white w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleShorten}
        >
          Shorten URL
        </button>

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold mb-2">Your shortened URL:</p>
            <a
              href={shortUrl}
              className="text-blue-600 hover:underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
