"use client";

import { useState } from "react";

export default function Home() {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

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

  function handleCopy() {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 min-h-screen flex justify-center items-center p-4">
      <div className="text-center max-w-2xl w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl text-gray-800 font-bold mb-4">
          ✂️ Shorten Your Links
        </h1>
        <h3 className="text-lg md:text-xl text-gray-600 mb-6">
          Paste your long URL and get a short, shareable link in seconds.
        </h3>
        <input
          className="w-full p-4 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          type="url"
          value={longUrl}
          placeholder="Paste your long URL here..."
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button
          className="text-center text-white w-full bg-indigo-600 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500"
          onClick={handleShorten}
        >
          Shorten URL
        </button>

        {shortUrl && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2 text-gray-700">
              Your shortened URL:
            </p>
            <div className="flex items-center justify-between">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 text-lg font-medium hover:underline break-all"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="ml-4 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
