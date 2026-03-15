import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startedYear: "desc" },
    });
    return NextResponse.json(experiences);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      position,
      company,
      via,
      startedYear,
      endedYear,
      timeline,
      type,
      description,
      url,
      website,
      imageUrl,
      tags,
    } = body;

    if (!id || !position || !company || !startedYear || !timeline || !type || !description || !url || !website || !imageUrl || !tags) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.create({
      data: {
        id,
        position,
        company,
        via,
        startedYear: Number(startedYear),
        endedYear: endedYear != null ? Number(endedYear) : undefined,
        timeline,
        type,
        description,
        url,
        website,
        imageUrl,
        tags,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Experience with this ID already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}
