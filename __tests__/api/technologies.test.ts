import { GET, POST } from "@/app/api/technologies/route";
import {
  GET as GET_BY_ID,
  PUT,
  DELETE,
} from "@/app/api/technologies/[id]/route";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    technology: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";

const mockTechnology = {
  id: 1,
  title: "Rust exp",
  src: "/icons/rust.svg",
  description: "NEAR-Devhub, GGx, NDC",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

const makeRequest = (url: string, init?: RequestInit) =>
  new Request(url, init);

const makeContext = (id: string) => ({
  params: Promise.resolve({ id }),
});

describe("GET /api/technologies", () => {
  it("returns all technologies with 200", async () => {
    (prisma.technology.findMany as jest.Mock).mockResolvedValue([
      mockTechnology,
    ]);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(1);
    expect(data[0].title).toBe("Rust exp");
  });

  it("returns 500 on database error", async () => {
    (prisma.technology.findMany as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );

    const res = await GET();
    expect(res.status).toBe(500);
  });
});

describe("POST /api/technologies", () => {
  const validBody = {
    title: "Go exp",
    src: "/icons/go.svg",
    description: "Backend services",
  };

  it("creates technology and returns 201", async () => {
    (prisma.technology.create as jest.Mock).mockResolvedValue({
      ...mockTechnology,
      ...validBody,
      id: 2,
    });

    const req = makeRequest("http://localhost/api/technologies", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validBody),
    });

    const res = await POST(req as never);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.title).toBe("Go exp");
  });

  it("returns 400 when required fields are missing", async () => {
    const req = makeRequest("http://localhost/api/technologies", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Partial" }),
    });

    const res = await POST(req as never);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toMatch(/missing required fields/i);
  });
});

describe("GET /api/technologies/:id", () => {
  it("returns technology by id with 200", async () => {
    (prisma.technology.findUnique as jest.Mock).mockResolvedValue(
      mockTechnology
    );

    const req = makeRequest("http://localhost/api/technologies/1");
    const res = await GET_BY_ID(req as never, makeContext("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.id).toBe(1);
  });

  it("returns 404 when not found", async () => {
    (prisma.technology.findUnique as jest.Mock).mockResolvedValue(null);

    const req = makeRequest("http://localhost/api/technologies/999");
    const res = await GET_BY_ID(req as never, makeContext("999"));
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toMatch(/not found/i);
  });
});

describe("PUT /api/technologies/:id", () => {
  it("updates technology and returns 200", async () => {
    const updated = { ...mockTechnology, description: "Updated description" };
    (prisma.technology.update as jest.Mock).mockResolvedValue(updated);

    const req = makeRequest("http://localhost/api/technologies/1", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ description: "Updated description" }),
    });

    const res = await PUT(req as never, makeContext("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.description).toBe("Updated description");
  });

  it("returns 404 when technology does not exist", async () => {
    const prismaError = { code: "P2025", message: "Record not found" };
    (prisma.technology.update as jest.Mock).mockRejectedValue(prismaError);

    const req = makeRequest("http://localhost/api/technologies/999", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ description: "Ghost" }),
    });

    const res = await PUT(req as never, makeContext("999"));
    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/technologies/:id", () => {
  it("deletes technology and returns 200", async () => {
    (prisma.technology.delete as jest.Mock).mockResolvedValue(mockTechnology);

    const req = makeRequest("http://localhost/api/technologies/1", {
      method: "DELETE",
    });

    const res = await DELETE(req as never, makeContext("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBeDefined();
  });

  it("returns 404 when technology does not exist", async () => {
    const prismaError = { code: "P2025", message: "Record not found" };
    (prisma.technology.delete as jest.Mock).mockRejectedValue(prismaError);

    const req = makeRequest("http://localhost/api/technologies/999", {
      method: "DELETE",
    });

    const res = await DELETE(req as never, makeContext("999"));
    expect(res.status).toBe(404);
  });
});
