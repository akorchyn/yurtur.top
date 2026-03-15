import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const entries = await prisma.timelineEntry.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(entries);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch timeline entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, title, description, icon, order } = body;

    if (!year || !title || !description || !icon) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const entry = await prisma.timelineEntry.create({
      data: {
        year,
        title,
        description,
        icon,
        order: order != null ? Number(order) : 0,
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create timeline entry" },
      { status: 500 }
    );
  }
}
