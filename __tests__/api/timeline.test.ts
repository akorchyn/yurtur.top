import { GET, POST } from "@/app/api/timeline/route";
import {
  GET as GET_BY_ID,
  PUT,
  DELETE,
} from "@/app/api/timeline/[id]/route";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    timelineEntry: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";

const mockEntry = {
  id: 1,
  year: "2024",
  title: "Test Event",
  description: "Something happened",
  icon: "🚀",
  order: 0,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

const makeRequest = (url: string, init?: RequestInit) =>
  new Request(url, init);

const makeContext = (id: string) => ({
  params: Promise.resolve({ id }),
});

describe("GET /api/timeline", () => {
  it("returns all timeline entries with 200", async () => {
    (prisma.timelineEntry.findMany as jest.Mock).mockResolvedValue([mockEntry]);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(1);
    expect(data[0].title).toBe("Test Event");
  });

  it("returns 500 on database error", async () => {
    (prisma.timelineEntry.findMany as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );

    const res = await GET();
    expect(res.status).toBe(500);
  });
});

describe("POST /api/timeline", () => {
  const validBody = {
    year: "2025",
    title: "New Event",
    description: "New thing happened",
    icon: "⭐",
    order: 1,
  };

  it("creates timeline entry and returns 201", async () => {
    (prisma.timelineEntry.create as jest.Mock).mockResolvedValue({
      ...mockEntry,
      ...validBody,
      id: 2,
    });

    const req = makeRequest("http://localhost/api/timeline", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validBody),
    });

    const res = await POST(req as never);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.title).toBe("New Event");
  });

  it("returns 400 when required fields are missing", async () => {
    const req = makeRequest("http://localhost/api/timeline", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ year: "2025" }),
    });

    const res = await POST(req as never);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toMatch(/missing required fields/i);
  });
});

describe("GET /api/timeline/:id", () => {
  it("returns entry by id with 200", async () => {
    (prisma.timelineEntry.findUnique as jest.Mock).mockResolvedValue(mockEntry);

    const req = makeRequest("http://localhost/api/timeline/1");
    const res = await GET_BY_ID(req as never, makeContext("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.id).toBe(1);
  });

  it("returns 404 when not found", async () => {
    (prisma.timelineEntry.findUnique as jest.Mock).mockResolvedValue(null);

    const req = makeRequest("http://localhost/api/timeline/999");
    const res = await GET_BY_ID(req as never, makeContext("999"));
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toMatch(/not found/i);
  });
});

describe("PUT /api/timeline/:id", () => {
  it("updates timeline entry and returns 200", async () => {
    const updated = { ...mockEntry, title: "Updated Event" };
    (prisma.timelineEntry.update as jest.Mock).mockResolvedValue(updated);

    const req = makeRequest("http://localhost/api/timeline/1", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Updated Event" }),
    });

    const res = await PUT(req as never, makeContext("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.title).toBe("Updated Event");
  });

  it("returns 404 when entry does not exist", async () => {
    const prismaError = { code: "P2025", message: "Record not found" };
    (prisma.timelineEntry.update as jest.Mock).mockRejectedValue(prismaError);

    const req = makeRequest("http://localhost/api/timeline/999", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Ghost" }),
    });

    const res = await PUT(req as never, makeContext("999"));
    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/timeline/:id", () => {
  it("deletes timeline entry and returns 200", async () => {
    (prisma.timelineEntry.delete as jest.Mock).mockResolvedValue(mockEntry);

    const req = makeRequest("http://localhost/api/timeline/1", {
      method: "DELETE",
    });

    const res = await DELETE(req as never, makeContext("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBeDefined();
  });

  it("returns 404 when entry does not exist", async () => {
    const prismaError = { code: "P2025", message: "Record not found" };
    (prisma.timelineEntry.delete as jest.Mock).mockRejectedValue(prismaError);

    const req = makeRequest("http://localhost/api/timeline/999", {
      method: "DELETE",
    });

    const res = await DELETE(req as never, makeContext("999"));
    expect(res.status).toBe(404);
  });
});
