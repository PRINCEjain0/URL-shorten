import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { longUrl } = await req.json();
    const shortUrl = nanoid(5);

    const newUrl = await prisma.URL.create({
      data: {
        shortUrl,
        longUrl,
      },
    });

    return Response.json({ shortUrl: `http://localhost:3001/${shortUrl}` });
  } catch (error) {
    return Response.json(
      { error: "Error creating short URL" },
      { status: 500 }
    );
  }
}
