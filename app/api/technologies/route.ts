import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(technologies);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch technologies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, src, description } = body;

    if (!title || !src || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const technology = await prisma.technology.create({
      data: { title, src, description },
    });

    return NextResponse.json(technology, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create technology" },
      { status: 500 }
    );
  }
}
