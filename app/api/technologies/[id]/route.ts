import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const technology = await prisma.technology.findUnique({
      where: { id: Number(id) },
    });

    if (!technology) {
      return NextResponse.json(
        { error: "Technology not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(technology);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch technology" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const technology = await prisma.technology.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(technology);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Technology not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update technology" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    await prisma.technology.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Technology deleted" });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Technology not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete technology" },
      { status: 500 }
    );
  }
}
