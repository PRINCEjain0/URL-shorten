import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { shortUrl } = await params;

  const url = await prisma.uRL.findUnique({
    where: { shortUrl },
  });

  if (!url) {
    return Response.json({ error: "URL not found" }, { status: 404 });
  }

  return Response.json({ longUrl: url.longUrl });
}
