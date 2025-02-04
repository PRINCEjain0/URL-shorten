import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { longUrl } = await req.json();
    const shortUrl = nanoid(5);

    await prisma.URL.create({
      data: {
        shortUrl,
        longUrl,
      },
    });

    return Response.json({ shortUrl: `http://shorturl/${shortUrl}` });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
