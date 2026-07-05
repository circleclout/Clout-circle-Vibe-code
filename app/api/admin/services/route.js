import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  order: z.number().int().optional(),
});

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" }
  });
  return NextResponse.json(services);
}

export async function POST(req) {
  // Rate Limiting
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const limit = rateLimit(ip, 5, 60000); // 5 requests per minute
  
  if (!limit.success) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  try {
    const rawData = await req.json();
    const data = serviceSchema.parse(rawData);

    const service = await prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        order: data.order || 0
      }
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
