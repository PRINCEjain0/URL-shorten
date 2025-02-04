import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function Get(req) {
  const shortUrl = req.json();

  const Url = await prisma.uRL.findUnique({
    where: {
      shortUrl,
    },
  });

  if (!Url) {
    return Response.json({ error: "URL not found" }, { status: 404 });
  }

  return Response.redirect(Url.longUrl);
}

export default Get;
