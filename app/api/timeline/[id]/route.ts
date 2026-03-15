import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const entry = await prisma.timelineEntry.findUnique({
      where: { id: Number(id) },
    });

    if (!entry) {
      return NextResponse.json(
        { error: "Timeline entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(entry);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch timeline entry" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const entry = await prisma.timelineEntry.update({
      where: { id: Number(id) },
      data: {
        ...body,
        order: body.order != null ? Number(body.order) : undefined,
      },
    });

    return NextResponse.json(entry);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Timeline entry not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update timeline entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    await prisma.timelineEntry.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Timeline entry deleted" });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Timeline entry not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete timeline entry" },
      { status: 500 }
    );
  }
}
